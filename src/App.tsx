import React, { useState, useEffect } from 'react';
import { Product, CartItem, OrderRecord, IntegrationSettings, CurrencyCode } from './types';
import { PRODUCTS, DEFAULT_INTEGRATION_SETTINGS } from './data/products';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CurrencyModal } from './components/CurrencyModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ProductLandingPage } from './pages/ProductLandingPage';
import { AdminPage } from './pages/AdminPage';

const STORAGE_KEY_SETTINGS = 'akinnike_store_settings';
const STORAGE_KEY_PRODUCTS = 'akinnike_store_products';
const STORAGE_KEY_CART = 'akinnike_store_cart';
const STORAGE_KEY_ORDERS = 'akinnike_store_orders';
const STORAGE_KEY_CURRENCY = 'akinnike_store_currency';

export default function App() {
  // Current route path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path && path !== '') return path;
    }
    return '/';
  });

  // Settings
  const [settings, setSettings] = useState<IntegrationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_INTEGRATION_SETTINGS;
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENCY) as CurrencyCode;
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'NGN';
  });

  // Modals & Drawers
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
  }, [currency]);

  // Handle browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Actions
  const handleAddToCart = (productOrItem: Product | CartItem, variationId?: string) => {
    if ('cartItemId' in productOrItem) {
      // It is a fully formed CartItem
      const item = productOrItem as CartItem;
      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (i) =>
            i.product.id === item.product.id &&
            i.variation.id === item.variation.id &&
            i.selectedCutOrGrind === item.selectedCutOrGrind &&
            i.selectedHeatLevel === item.selectedHeatLevel
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += item.quantity;
          return updated;
        }
        return [...prev, item];
      });
      setIsCartDrawerOpen(true);
      return;
    }

    // It is a Product
    const product = productOrItem as Product;
    const variation = variationId
      ? product.variations.find((v) => v.id === variationId) || product.variations[0]
      : product.variations[0];

    const newItem: CartItem = {
      cartItemId: `${product.id}_${variation.id}_${Date.now()}`,
      product,
      variation,
      selectedCutOrGrind: variation.cutOrGrindOptions ? variation.cutOrGrindOptions[0] : undefined,
      selectedHeatLevel: variation.heatLevels ? variation.heatLevels[0] : undefined,
      quantity: 1,
    };

    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variation.id === variation.id
      );
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === existing.cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, newItem];
    });

    setIsCartDrawerOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderCompleted = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Route Rendering
  const renderCurrentPage = () => {
    // 1. Landing pages: /landing/:slug
    if (currentPath.startsWith('/landing/')) {
      const slug = currentPath.replace('/landing/', '');
      const matchedProduct = products.find((p) => p.slug === slug);
      if (matchedProduct) {
        return (
          <ProductLandingPage
            product={matchedProduct}
            onNavigate={navigateTo}
            currency={currency}
            onAddToCart={handleAddToCart}
            settings={settings}
            onOrderCompleted={handleOrderCompleted}
          />
        );
      }
    }

    // 2. Main static & company pages
    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={navigateTo} settings={settings} />;
      case '/contact':
        return <ContactPage settings={settings} />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/admin':
        return (
          <AdminPage
            products={products}
            onUpdateProducts={setProducts}
            settings={settings}
            onUpdateSettings={setSettings}
            orders={orders}
            onUpdateOrders={setOrders}
            currency={currency}
          />
        );
      case '/':
      default:
        return (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            currency={currency}
            onAddToCart={handleAddToCart}
            settings={settings}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#12100E] text-[#F3EFEA] font-sans">
      {/* Universal Top Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        currency={currency}
        onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)}
        cartItems={cartItems}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} whatsappNumber={settings.whatsappNumber} />

      {/* Currency Modal */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        selectedCurrency={currency}
        onSelectCurrency={setCurrency}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={currency}
        settings={settings}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Floating WhatsApp Concierge Widget */}
      <WhatsAppFloatingButton whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
