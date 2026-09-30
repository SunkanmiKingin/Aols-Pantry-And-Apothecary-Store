import { ref, reactive, computed } from 'vue';
import { Product, CartItem, OrderRecord, CurrencyCode, CustomerOrderData, PantryConfig } from '../types';
import { PRODUCTS } from '../data/products';
import { getPantryConfig, savePantryConfig } from '../config';
import { generateWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import { dispatchMultichannelWebhook } from '../utils/webhook';

const STORAGE_KEY_CURRENCY = 'akinnike_vue_currency';
const STORAGE_KEY_CART = 'akinnike_vue_cart';
const STORAGE_KEY_ORDERS = 'akinnike_vue_orders';
const STORAGE_KEY_PRODUCTS = 'akinnike_vue_products';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CART);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return raw ? JSON.parse(raw) : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

// State singletons
const currency = ref<CurrencyCode>((localStorage.getItem(STORAGE_KEY_CURRENCY) as CurrencyCode) || 'NGN');
const cart = ref<CartItem[]>(loadCart());
const orders = ref<OrderRecord[]>(loadOrders());
const products = ref<Product[]>(loadProducts());

const config = ref<PantryConfig>(getPantryConfig());
const isCartOpen = ref(false);
const isCurrencyModalOpen = ref(false);
const activeReceipt = ref<OrderRecord | null>(null);

// Persistence watchers
function syncCart() {
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart.value));
}

function syncOrders() {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders.value));
}

function syncProducts() {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products.value));
}

export function usePantryStore() {
  const cartCount = computed(() => cart.value.reduce((acc, it) => acc + it.quantity, 0));
  const cartSubtotalNgn = computed(() =>
    cart.value.reduce((acc, it) => acc + it.variation.priceNgn * it.quantity, 0)
  );

  const setCurrency = (c: CurrencyCode) => {
    currency.value = c;
    localStorage.setItem(STORAGE_KEY_CURRENCY, c);
  };

  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  const openCurrencyModal = () => {
    isCurrencyModalOpen.value = true;
  };

  const closeCurrencyModal = () => {
    isCurrencyModalOpen.value = false;
  };

  const closeReceipt = () => {
    activeReceipt.value = null;
  };

  const addToCart = (item: CartItem) => {
    const existing = cart.value.find(
      (it) =>
        it.product.id === item.product.id &&
        it.variation.id === item.variation.id &&
        it.selectedCutOrGrind === item.selectedCutOrGrind &&
        it.selectedHeatLevel === item.selectedHeatLevel
    );

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.value.push({ ...item });
    }
    syncCart();
    isCartOpen.value = true;
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    const target = cart.value.find((it) => it.cartItemId === cartItemId);
    if (!target) return;
    const next = target.quantity + delta;
    if (next <= 0) {
      cart.value = cart.value.filter((it) => it.cartItemId !== cartItemId);
    } else {
      target.quantity = next;
    }
    syncCart();
  };

  const removeCartItem = (cartItemId: string) => {
    cart.value = cart.value.filter((it) => it.cartItemId !== cartItemId);
    syncCart();
  };

  const clearCart = () => {
    cart.value = [];
    syncCart();
  };

  const getShippingRangeText = (zoneId: string): string => {
    const zone = config.value.shippingEstimates.find((z) => z.id === zoneId) || config.value.shippingEstimates[0];
    return `₦${zone.minNgn.toLocaleString('en-NG')} – ₦${zone.maxNgn.toLocaleString('en-NG')} (${zone.deliveryDays})`;
  };

  // 1. ORDER ON WEBSITE (Submits to Nodus Webhook API)
  const submitOrderOnWebsite = async (
    customer: CustomerOrderData,
    overrideItems?: CartItem[]
  ): Promise<OrderRecord> => {
    const itemsToOrder = overrideItems || [...cart.value];
    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);
    const sessionRef = 'WEB-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const subtotal = itemsToOrder.reduce((acc, it) => acc + it.variation.priceNgn * it.quantity, 0);
    const shippingRange = getShippingRangeText(customer.deliveryZone);

    const record: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      sessionRef,
      date: new Date().toISOString(),
      customer: { ...customer, preferredChannel: 'web_storefront' },
      items: itemsToOrder,
      subtotalNgn: subtotal,
      shippingEstimateRange: shippingRange,
      currency: currency.value,
      status: 'new',
      channel: 'web_storefront',
      webhookDispatched: false,
    };

    try {
      const res = await dispatchMultichannelWebhook('order.created', record);
      record.webhookDispatched = res.success;
      record.webhookResponseStatus = res.statusCode;
    } catch (err) {
      console.warn('Multichannel webhook dispatch notice:', err);
    }

    orders.value.unshift(record);
    syncOrders();

    if (!overrideItems) {
      clearCart();
    }

    activeReceipt.value = record;
    return record;
  };

  // 2. ORDER VIA WHATSAPP (Deep link + session handoff webhook)
  const initiateWhatsAppOrder = async (
    customer: CustomerOrderData,
    overrideItems?: CartItem[]
  ): Promise<OrderRecord> => {
    const itemsToOrder = overrideItems || [...cart.value];
    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);
    const sessionRef = 'WA-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const subtotal = itemsToOrder.reduce((acc, it) => acc + it.variation.priceNgn * it.quantity, 0);
    const shippingRange = getShippingRangeText(customer.deliveryZone);

    const record: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      sessionRef,
      date: new Date().toISOString(),
      customer: { ...customer, preferredChannel: 'whatsapp' },
      items: itemsToOrder,
      subtotalNgn: subtotal,
      shippingEstimateRange: shippingRange,
      currency: currency.value,
      status: 'new',
      channel: 'whatsapp',
      webhookDispatched: false,
    };

    // Emit session handoff event to backend orchestrator
    try {
      const res = await dispatchMultichannelWebhook('cart.whatsapp_initiated', record);
      record.webhookDispatched = res.success;
      record.webhookResponseStatus = res.statusCode;
    } catch (e) {
      console.warn('Session handoff notice:', e);
    }

    orders.value.unshift(record);
    syncOrders();

    // Generate formatted message and open WhatsApp
    const message = generateWhatsAppOrderMessage({
      customer,
      items: itemsToOrder,
      currency: currency.value,
      orderNumber,
      sessionRef,
      shippingRangeText: shippingRange,
    });

    openWhatsAppChat(message);

    if (!overrideItems) {
      clearCart();
    }

    return record;
  };

  const updateProductStock = (productId: string, variationId: string) => {
    const p = products.value.find((prod) => prod.id === productId);
    if (!p) return;
    const v = p.variations.find((varItem) => varItem.id === variationId);
    if (!v) return;
    v.inStock = !v.inStock;
    syncProducts();
  };

  const updateProductPrice = (productId: string, variationId: string, newPriceNgn: number) => {
    const p = products.value.find((prod) => prod.id === productId);
    if (!p) return;
    const v = p.variations.find((varItem) => varItem.id === variationId);
    if (!v) return;
    v.priceNgn = newPriceNgn;
    syncProducts();
  };

  const updateConfig = (newConfig: PantryConfig) => {
    config.value = newConfig;
    savePantryConfig(newConfig);
  };

  return {
    currency,
    cart,
    orders,
    products,
    config,
    isCartOpen,
    isCurrencyModalOpen,
    activeReceipt,
    cartCount,
    cartSubtotalNgn,
    setCurrency,
    openCart,
    closeCart,
    openCurrencyModal,
    closeCurrencyModal,
    closeReceipt,
    addToCart,
    updateQuantity,
    removeCartItem,
    clearCart,
    submitOrderOnWebsite,
    initiateWhatsAppOrder,
    updateProductStock,
    updateProductPrice,
    updateConfig,
    getShippingRangeText,
  };
}
