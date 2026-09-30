import { CartItem, CustomerOrderData, CurrencyCode, IntegrationSettings } from '../types';
import { formatPrice } from './currency';

export function sanitizePhoneNumberForWhatsApp(phone: string, defaultCountryCode: string = '234'): string {
  // Strip all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If Nigerian local format starting with '0', convert to country code (e.g. 07051377659 -> 2347051377659)
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
  settings: IntegrationSettings;
  orderNumber: string;
  shippingFeeNgn: number;
}): string {
  const { customer, items, currency, orderNumber, shippingFeeNgn } = params;

  let subtotalNgn = 0;
  items.forEach(item => {
    subtotalNgn += item.variation.priceNgn * item.quantity;
  });
  const grandTotalNgn = subtotalNgn + shippingFeeNgn;

  const zoneNames: Record<string, string> = {
    southwest: 'Southwest Nigeria (Primary Express)',
    'nigeria-wide': 'Nationwide Nigeria (Interstate)',
    'diaspora-international': 'African Continental & Diaspora Express (UK/US/Global)',
  };

  const lines: string[] = [
    `🌿 *AKINNIKE OLS PANTRY & APOTHECARY*`,
    `*Order Request: #${orderNumber}*`,
    `----------------------------------------`,
    `👤 *CUSTOMER DETAILS:*`,
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
      `   • Size / Pack: ${item.variation.name}`,
      item.selectedCutOrGrind ? `   • Cut / Grind: ${item.selectedCutOrGrind}` : '',
      item.selectedHeatLevel ? `   • Heat / Flavour: ${item.selectedHeatLevel}` : '',
      `   • Qty: ${item.quantity} × ${formatPrice(item.variation.priceNgn, currency)} = *${formatPrice(itemTotalNgn, currency)}*`
    );
  });

  lines.push(
    `\n----------------------------------------`,
    `💰 *PAYMENT SUMMARY:*`,
    `• Subtotal: ${formatPrice(subtotalNgn, currency)}`,
    `• Est. Shipping: ${formatPrice(shippingFeeNgn, currency)}`,
    `• *GRAND TOTAL: ${formatPrice(grandTotalNgn, currency)}*`
  );

  if (customer.notes && customer.notes.trim()) {
    lines.push(
      `----------------------------------------`,
      `📝 *SPECIAL NOTES & INSTRUCTIONS:*`,
      customer.notes.trim()
    );
  }

  lines.push(
    `----------------------------------------`,
    `Kindly confirm batch availability, payment details, and estimated dispatch time. Thank you!`
  );

  return lines.filter(Boolean).join('\n');
}

export function buildWhatsAppDirectLink(params: {
  phone: string;
  message: string;
  defaultCountryCode?: string;
}): string {
  const cleanPhone = sanitizePhoneNumberForWhatsApp(params.phone, params.defaultCountryCode || '234');
  const encodedText = encodeURIComponent(params.message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function openWhatsAppChat(params: {
  phone: string;
  message: string;
  defaultCountryCode?: string;
}): void {
  const url = buildWhatsAppDirectLink(params);
  window.open(url, '_blank', 'noopener,noreferrer');
}
