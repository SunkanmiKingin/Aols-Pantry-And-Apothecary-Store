import React, { useState } from 'react';
import { CartItem, CurrencyCode, CustomerOrderData, IntegrationSettings, OrderRecord } from '../types';
import { formatPrice } from '../utils/currency';
import { generateWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import { dispatchOrderWebhook } from '../utils/webhook';
import { X, Trash2, Plus, Minus, MessageCircle, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  currency: CurrencyCode;
  settings: IntegrationSettings;
  onOrderCompleted?: (order: OrderRecord) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  settings,
  onOrderCompleted,
}) => {
  const [customer, setCustomer] = useState<CustomerOrderData>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    stateOrRegion: 'Lagos',
    country: 'Nigeria',
    deliveryZone: 'southwest',
    notes: '',
    preferredContact: 'whatsapp',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotalNgn = cartItems.reduce((acc, item) => acc + item.variation.priceNgn * item.quantity, 0);
  
  const currentZone = settings.shippingZones.find(z => z.id === customer.deliveryZone) || settings.shippingZones[0];
  const shippingFeeNgn = cartItems.length > 0 ? currentZone.feeNgn : 0;
  const grandTotalNgn = subtotalNgn + shippingFeeNgn;

  const validateForm = () => {
    if (!customer.customerName.trim()) {
      setErrorMessage('Please enter your name.');
      return false;
    }
    if (!customer.phone.trim() || customer.phone.length < 7) {
      setErrorMessage('Please enter a valid phone or WhatsApp number.');
      return false;
    }
    if (!customer.address.trim()) {
      setErrorMessage('Please enter your delivery street address.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleWhatsAppOrder = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);

    const orderRecord: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      date: new Date().toISOString(),
      customer,
      items: cartItems,
      totalNgn: grandTotalNgn,
      currency,
      totalInCurrency: grandTotalNgn,
      status: 'new',
      channel: 'whatsapp',
      webhookDispatched: false,
    };

    // 1. Dispatch Webhook in background
    if (settings.enableAutoWebhookDispatch) {
      try {
        const webhookRes = await dispatchOrderWebhook(orderRecord, settings);
        orderRecord.webhookDispatched = webhookRes.success;
        orderRecord.webhookResponseStatus = webhookRes.statusCode;
      } catch (err) {
        console.warn('Webhook auto-dispatch note:', err);
      }
    }

    // 2. Build message and trigger WhatsApp
    const message = generateWhatsAppOrderMessage({
      customer,
      items: cartItems,
      currency,
      settings,
      orderNumber,
      shippingFeeNgn,
    });

    openWhatsAppChat({
      phone: settings.whatsappNumber,
      message,
      defaultCountryCode: settings.whatsappCountryCode,
    });

    if (onOrderCompleted) {
      onOrderCompleted(orderRecord);
    }

    setSuccessMessage(`Order #${orderNumber} generated! Opening WhatsApp chat with our concierge...`);
    setIsSubmitting(false);

    setTimeout(() => {
      onClearCart();
      setSuccessMessage(null);
      onClose();
    }, 3000);
  };

  const handleWebhookOnlyOrder = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);

    const orderRecord: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      date: new Date().toISOString(),
      customer,
      items: cartItems,
      totalNgn: grandTotalNgn,
      currency,
      totalInCurrency: grandTotalNgn,
      status: 'new',
      channel: 'webhook_api',
      webhookDispatched: false,
    };

    const webhookRes = await dispatchOrderWebhook(orderRecord, settings);
    orderRecord.webhookDispatched = webhookRes.success;
    orderRecord.webhookResponseStatus = webhookRes.statusCode;

    if (onOrderCompleted) {
      onOrderCompleted(orderRecord);
    }

    setIsSubmitting(false);
    setSuccessMessage(`Order #${orderNumber} sent directly to backend API (nodus.com/api/webhooks). We will contact you on ${customer.phone}!`);

    setTimeout(() => {
      onClearCart();
      setSuccessMessage(null);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-lg bg-[#14100E] border-l border-[#2E241E] h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b border-[#261E18] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <span className="font-serif font-bold text-sm">AO</span>
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-100">Your Pantry Bag</h2>
              <p className="text-xs text-stone-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-[#201813] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {successMessage && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-200 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">Order Initiated Successfully</p>
                <p className="mt-0.5 leading-relaxed">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1C1612] border border-[#2B211A] flex items-center justify-center text-stone-500">
                🌿
              </div>
              <p className="font-serif text-lg text-stone-300">Your pantry bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our signature concoctions, flavoured beef & chicken, and heritage botanical teas.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                <span>Selected Pantry Essentials</span>
                <button
                  onClick={onClearCart}
                  className="text-stone-500 hover:text-red-400 transition-colors text-[11px]"
                >
                  Clear Bag
                </button>
              </div>

              {cartItems.map((item) => {
                const itemTotalNgn = item.variation.priceNgn * item.quantity;
                return (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-xl bg-[#1B1511] border border-[#2B211A] flex gap-3 relative"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-200 font-serif">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-mono font-medium text-amber-400 whitespace-nowrap">
                          {formatPrice(itemTotalNgn, currency)}
                        </span>
                      </div>

                      <p className="text-xs text-stone-400">{item.variation.name}</p>

                      {(item.selectedHeatLevel || item.selectedCutOrGrind) && (
                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-stone-400">
                          {item.selectedCutOrGrind && (
                            <span className="bg-[#241D17] px-2 py-0.5 rounded text-[10px] text-amber-300">
                              {item.selectedCutOrGrind}
                            </span>
                          )}
                          {item.selectedHeatLevel && (
                            <span className="bg-[#241D17] px-2 py-0.5 rounded text-[10px] text-stone-300">
                              {item.selectedHeatLevel}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 bg-[#140F0D] border border-[#2B211A] rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-stone-200">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-stone-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Delivery & Customer Checkout Details */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-[#261E18] space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Delivery Details
              </h3>

              {/* Delivery Destination Zone */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5">
                  Select Destination Zone
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {settings.shippingZones.map((zone) => {
                    const isSelected = customer.deliveryZone === zone.id;
                    return (
                      <button
                        type="button"
                        key={zone.id}
                        onClick={() => setCustomer({ ...customer, deliveryZone: zone.id })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-950/40 border-amber-600/60 text-amber-200'
                            : 'bg-[#181310] border-[#291F18] text-stone-300 hover:bg-[#201813]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{zone.name}</span>
                          <span className="font-mono text-amber-400">
                            {formatPrice(zone.feeNgn, currency)}
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          {zone.estimatedDays} · {zone.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={customer.customerName}
                    onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                    placeholder="e.g. Tayo Akinnike"
                    className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="e.g. 08012345678"
                    className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Delivery Street Address *</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House/Plot, Street name, Estate/Area"
                  className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">City / Town</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="e.g. Ibadan or Lekki"
                    className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">State / Region</label>
                  <input
                    type="text"
                    value={customer.stateOrRegion}
                    onChange={(e) => setCustomer({ ...customer, stateOrRegion: e.target.value })}
                    placeholder="e.g. Oyo or Lagos"
                    className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">Special Order Notes</label>
                <textarea
                  rows={2}
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. Kindly grind fine, deliver before 2 PM, or allergen requests"
                  className="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#261E18] bg-[#100D0B] space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Pantry Subtotal:</span>
                <span className="font-mono">{formatPrice(subtotalNgn, currency)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Shipping ({currentZone.name.split(' ')[0]}):</span>
                <span className="font-mono">{formatPrice(shippingFeeNgn, currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-100 pt-1.5 border-t border-[#231A14]">
                <span className="font-serif">Grand Total:</span>
                <div className="text-right">
                  <div className="font-mono text-amber-400">{formatPrice(grandTotalNgn, currency)}</div>
                  {currency !== 'NGN' && (
                    <div className="text-[10px] text-stone-500 font-mono">
                      (Approx. ₦{grandTotalNgn.toLocaleString('en-NG')})
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: WhatsApp (Primary) and Webhook (API) */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant Order via WhatsApp Concierge</span>
              </button>

              <button
                type="button"
                onClick={handleWebhookOnlyOrder}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1C1612] hover:bg-[#251D18] border border-[#33261D] text-stone-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-500" />
                <span>Submit to Backend API (nodus.com/api/webhooks)</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Small-batch prepared · Freshness guaranteed · Southwest Nigeria express logistics</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
