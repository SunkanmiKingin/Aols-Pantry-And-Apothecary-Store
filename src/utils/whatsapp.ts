import { CartItem, CustomerOrderData, CurrencyCode } from '../types';
import { formatPrice } from './currency';
import { getPantryConfig } from '../config';

export function sanitizePhoneNumberForWhatsApp(phone: string, defaultCountryCode: string = '234'): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = defaultCountryCode + cleaned.slice(1);
  } else if (!cleaned.startsWith(defaultCountryCode) && cleaned.length === 10) {
    cleaned = defaultCountryCode + cleaned;
  }
  return cleaned;
}

export function generateWhatsAppOrderMessage(params: {
  customer: CustomerOrderData;
  items: CartItem[];
  currency: CurrencyCode;
  orderNumber: string;
  sessionRef: string;
  shippingRangeText: string;
}): string {
  const { customer, items, currency, orderNumber, sessionRef, shippingRangeText } = params;
  const config = getPantryConfig();

  let subtotalNgn = 0;
  items.forEach((item) => {
    subtotalNgn += item.variation.priceNgn * item.quantity;
  });

  const zoneNames: Record<string, string> = {
    southwest: 'Southwest Nigeria (Primary Hub Express)',
    nationwide: 'Nationwide Nigeria (Interstate Courier)',
    diaspora: 'African Continental & Diaspora Express (DHL/FedEx)',
  };

  const lines: string[] = [
    `🌿 *AKINNIKE OLS PANTRY & APOTHECARY*`,
    `*Order Request: #${orderNumber}*  [Session Ref: *${sessionRef}*]`,
    `----------------------------------------`,
    `👤 *CUSTOMER PROFILE:*`,
    `• Name: ${customer.customerName || 'Valued Customer'}`,
    `• Phone: ${customer.phone}`,
    customer.email ? `• Email: ${customer.email}` : '',
    `• Delivery Address: ${customer.address || 'Address provided on chat'}`,
    customer.city ? `• City / State: ${customer.city}, ${customer.stateOrRegion}` : '',
    `• Destination Zone: ${zoneNames[customer.deliveryZone] || customer.deliveryZone}`,
    `----------------------------------------`,
    `📦 *ORDERED PANTRY ITEMS:*`
  ].filter(Boolean);

  items.forEach((item, index) => {
    const itemTotalNgn = item.variation.priceNgn * item.quantity;
    lines.push(
      `\n${index + 1}. *${item.product.name}*`,
      `   • Pack / Size: ${item.variation.name}`,
      item.selectedCutOrGrind ? `   • Cut / Grind: ${item.selectedCutOrGrind}` : '',
      item.selectedHeatLevel ? `   • Heat / Flavour: ${item.selectedHeatLevel}` : '',
      `   • Qty: ${item.quantity} × ${formatPrice(item.variation.priceNgn, currency, true)} = *${formatPrice(itemTotalNgn, currency, true)}*`
    );
  });

  lines.push(
    `\n----------------------------------------`,
    `💰 *PAYMENT ESTIMATE SUMMARY:*`,
    `• Items Subtotal: *${formatPrice(subtotalNgn, currency, true)}*`,
    `• Est. Shipping Range: *${shippingRangeText}*`,
    `  _(Final courier tariff confirmed based on exact delivery coordinates)_`
  );

  if (customer.notes && customer.notes.trim()) {
    lines.push(
      `----------------------------------------`,
      `📝 *SPECIAL NOTES & DIETARY PREFERENCES:*`,
      customer.notes.trim()
    );
  }

  lines.push(
    `----------------------------------------`,
    `Kindly confirm batch availability, payment account details, and dispatch timing. Thank you!`
  );

  return lines.filter(Boolean).join('\n');
}

export function buildWhatsAppDirectLink(message: string): string {
  const config = getPantryConfig();
  const phone = sanitizePhoneNumberForWhatsApp(
    config?.channels?.whatsapp?.number || '07051377659',
    config?.channels?.whatsapp?.countryCode || '234'
  );
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedText}`;
}

export function openWhatsAppChat(message: string): void {
  const url = buildWhatsAppDirectLink(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
