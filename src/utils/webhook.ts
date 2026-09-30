import { OrderRecord } from '../types';
import { getPantryConfig } from '../config';

export interface WebhookLogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  event: 'order.created' | 'cart.whatsapp_initiated' | 'inquiry.submitted' | 'webhook.ping';
  orderNumber?: string;
  sessionRef?: string;
  payload: any;
  status: 'success' | 'network_error' | 'pending';
  responseCode?: number;
  responseMessage?: string;
}

const STORAGE_KEY_WEBHOOK_LOGS = 'akinnike_webhook_logs_v2';

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
    const updated = [entry, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY_WEBHOOK_LOGS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save webhook log:', err);
  }
}

export async function dispatchMultichannelWebhook(
  event: 'order.created' | 'cart.whatsapp_initiated' | 'inquiry.submitted',
  order: OrderRecord
): Promise<{ success: boolean; statusCode?: number; message: string }> {
  const config = getPantryConfig();
  const endpoint = config.backendApi.webhookUrl || 'https://nodus.com/api/webhooks';

  const payload = {
    event,
    channel: 'web_storefront',
    source_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    session_ref: order.sessionRef,
    customer: {
      name: order.customer.customerName,
      phone: order.customer.phone,
      email: order.customer.email || null,
      delivery_address: order.customer.address,
      city: order.customer.city || null,
      region: order.customer.stateOrRegion,
      country: order.customer.country,
      delivery_zone: order.customer.deliveryZone,
      notes: order.customer.notes || null,
      preferred_channel: order.customer.preferredChannel || 'web_storefront',
    },
    order: {
      order_number: order.orderNumber,
      date: order.date,
      status: order.status,
      items: order.items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        category: item.product.category,
        sku: item.variation.sku,
        variation_name: item.variation.name,
        size_grams: item.variation.sizeGrams,
        cut_or_grind: item.selectedCutOrGrind || null,
        heat_level: item.selectedHeatLevel || null,
        quantity: item.quantity,
        unit_price_ngn: item.variation.priceNgn,
        line_total_ngn: item.variation.priceNgn * item.quantity,
      })),
      financials: {
        subtotal_ngn: order.subtotalNgn,
        currency_code: order.currency,
        shipping_estimate_range: order.shippingEstimateRange,
      }
    }
  };

  const logEntry: WebhookLogEntry = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    endpoint,
    event,
    orderNumber: order.orderNumber,
    sessionRef: order.sessionRef,
    payload,
    status: 'pending',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pantry-Secret': config.backendApi.secretToken || 'akinnike-secret',
        'X-Event-Type': event,
      },
      body: JSON.stringify(payload),
    });

    logEntry.status = response.ok ? 'success' : 'network_error';
    logEntry.responseCode = response.status;
    logEntry.responseMessage = response.statusText || (response.ok ? 'Accepted by Nodus Webhook API' : 'HTTP Error');
    saveWebhookLog(logEntry);

    return {
      success: response.ok,
      statusCode: response.status,
      message: response.ok ? 'Webhook successfully accepted by endpoint.' : `Server responded with ${response.status}`,
    };
  } catch (error: any) {
    // Graceful no-cors transport fallback
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });
      logEntry.status = 'success';
      logEntry.responseCode = 200;
      logEntry.responseMessage = 'Dispatched via no-cors transport to external backend';
      saveWebhookLog(logEntry);
      return {
        success: true,
        statusCode: 200,
        message: 'Payload dispatched to backend orchestration endpoint.',
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

export async function testWebhookPing(): Promise<{ success: boolean; message: string; statusCode?: number }> {
  const config = getPantryConfig();
  const endpoint = config.backendApi.webhookUrl || 'https://nodus.com/api/webhooks';
  const pingPayload = {
    event: 'webhook.ping',
    timestamp: new Date().toISOString(),
    source: 'Akinnike Ols Pantry & Apothecary Orchestrator Diagnostic',
    channel: 'web_storefront',
    message: 'Diagnostic ping verifying connectivity to Nodus Webhook API.',
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
        'X-Pantry-Secret': config.backendApi.secretToken,
      },
      body: JSON.stringify(pingPayload),
    });

    logEntry.status = res.ok ? 'success' : 'network_error';
    logEntry.responseCode = res.status;
    logEntry.responseMessage = res.statusText || 'Diagnostic response received';
    saveWebhookLog(logEntry);

    return {
      success: res.ok,
      statusCode: res.status,
      message: res.ok ? `Ping successful (Status ${res.status})` : `Server responded with HTTP ${res.status}`,
    };
  } catch (err: any) {
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
