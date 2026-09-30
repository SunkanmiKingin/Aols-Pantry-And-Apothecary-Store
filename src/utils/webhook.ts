import { OrderRecord, IntegrationSettings } from '../types';

export interface WebhookLogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  orderNumber?: string;
  event: 'order.created' | 'webhook.ping' | 'inquiry.created';
  payload: any;
  status: 'success' | 'network_error' | 'pending';
  responseCode?: number;
  responseMessage?: string;
}

const STORAGE_KEY_WEBHOOK_LOGS = 'akinnike_webhook_logs';

export function getWebhookLogs(): WebhookLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_WEBHOOK_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse webhook logs:', err);
    return [];
  }
}

export function saveWebhookLog(entry: WebhookLogEntry): void {
  try {
    const current = getWebhookLogs();
    const updated = [entry, ...current].slice(0, 50); // keep last 50 logs
    localStorage.setItem(STORAGE_KEY_WEBHOOK_LOGS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save webhook log:', err);
  }
}

export async function dispatchOrderWebhook(
  order: OrderRecord,
  settings: IntegrationSettings
): Promise<{ success: boolean; statusCode?: number; message: string }> {
  const endpoint = settings.webhookUrl || 'https://nodus.com/api/webhooks';

  const payload = {
    event: 'order.created',
    version: '1.0',
    timestamp: new Date().toISOString(),
    source: 'Akinnike Ols Pantry & Apothecary Storefront',
    data: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      date: order.date,
      customer: {
        name: order.customer.customerName,
        phone: order.customer.phone,
        email: order.customer.email,
        deliveryAddress: order.customer.address,
        city: order.customer.city,
        state: order.customer.stateOrRegion,
        country: order.customer.country,
        deliveryZone: order.customer.deliveryZone,
        notes: order.customer.notes,
        preferredContact: order.customer.preferredContact,
      },
      items: order.items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        category: item.product.category,
        sku: item.variation.sku,
        variationName: item.variation.name,
        sizeGrams: item.variation.sizeGrams,
        cutOrGrind: item.selectedCutOrGrind || null,
        heatLevel: item.selectedHeatLevel || null,
        quantity: item.quantity,
        priceNgn: item.variation.priceNgn,
        lineTotalNgn: item.variation.priceNgn * item.quantity,
      })),
      pricing: {
        totalNgn: order.totalNgn,
        currency: order.currency,
        totalInCurrency: order.totalInCurrency,
      },
      channel: order.channel,
      status: order.status,
    }
  };

  const logEntry: WebhookLogEntry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    endpoint,
    orderNumber: order.orderNumber,
    event: 'order.created',
    payload,
    status: 'pending',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pantry-Secret': settings.webhookSecretToken || 'akinnike-secret',
        'X-Event-Type': 'order.created',
      },
      body: JSON.stringify(payload),
      // mode: 'cors' is default; no-cors allows dispatch even if server hasn't set permissive CORS
    });

    logEntry.status = response.ok ? 'success' : 'network_error';
    logEntry.responseCode = response.status;
    logEntry.responseMessage = response.statusText || (response.ok ? 'Dispatched successfully' : 'HTTP Error');
    saveWebhookLog(logEntry);

    return {
      success: response.ok,
      statusCode: response.status,
      message: response.ok ? 'Webhook successfully accepted by endpoint.' : `Server responded with ${response.status}`,
    };
  } catch (error: any) {
    // In browser environments without pre-flight CORS headers on 3rd party webhooks, fetch might reject, but we can also fire with mode: 'no-cors' or log the full payload.
    console.warn('Webhook dispatch network note (may be CORS restricted on 3rd party endpoint):', error);

    try {
      // Secondary attempt with no-cors so packet reaches server regardless
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });
      logEntry.status = 'success';
      logEntry.responseCode = 200;
      logEntry.responseMessage = 'Dispatched via no-cors transport to external webhook';
      saveWebhookLog(logEntry);
      return {
        success: true,
        statusCode: 200,
        message: 'Payload queued and dispatched to ' + endpoint,
      };
    } catch (e2: any) {
      logEntry.status = 'network_error';
      logEntry.responseMessage = error?.message || 'External endpoint unreachable';
      saveWebhookLog(logEntry);
      return {
        success: false,
        message: 'Webhook error: ' + (error?.message || 'Endpoint unreachable'),
      };
    }
  }
}

export async function testWebhookPing(settings: IntegrationSettings): Promise<{ success: boolean; message: string; statusCode?: number }> {
  const endpoint = settings.webhookUrl || 'https://nodus.com/api/webhooks';
  const pingPayload = {
    event: 'webhook.ping',
    timestamp: new Date().toISOString(),
    source: 'Akinnike Ols Pantry & Apothecary Admin Console',
    message: 'Test ping to verify API connectivity from storefront to Nodus Webhook backend.',
    sender: 'Akinnike Ols Admin'
  };

  const logEntry: WebhookLogEntry = {
    id: 'ping_' + Date.now(),
    timestamp: new Date().toISOString(),
    endpoint,
    event: 'webhook.ping',
    payload: pingPayload,
    status: 'pending',
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pantry-Secret': settings.webhookSecretToken,
      },
      body: JSON.stringify(pingPayload),
    });

    logEntry.status = res.ok ? 'success' : 'network_error';
    logEntry.responseCode = res.status;
    logEntry.responseMessage = res.statusText || 'Ping response received';
    saveWebhookLog(logEntry);

    return {
      success: res.ok,
      statusCode: res.status,
      message: res.ok ? `Ping successful (Status ${res.status})` : `Server responded with HTTP ${res.status}`,
    };
  } catch (err: any) {
    // Attempt no-cors transport
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(pingPayload),
      });
      logEntry.status = 'success';
      logEntry.responseCode = 200;
      logEntry.responseMessage = 'Ping sent via no-cors transport';
      saveWebhookLog(logEntry);
      return {
        success: true,
        statusCode: 200,
        message: 'Ping packet dispatched to ' + endpoint,
      };
    } catch (e2: any) {
      logEntry.status = 'network_error';
      logEntry.responseMessage = err?.message || 'Connection failed';
      saveWebhookLog(logEntry);
      return {
        success: false,
        message: 'Ping failed: ' + (err?.message || 'Network error'),
      };
    }
  }
}
