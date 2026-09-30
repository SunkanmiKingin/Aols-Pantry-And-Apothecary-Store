import React, { useState } from 'react';
import { Product, ProductVariation, CurrencyCode, IntegrationSettings, CartItem, OrderRecord } from '../types';
import { ProductArtwork } from '../components/ProductArtwork';
import { formatPrice } from '../utils/currency';
import { generateWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import { dispatchOrderWebhook } from '../utils/webhook';
import { 
  MessageCircle, 
  Send, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Scale, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Truck,
  Leaf
} from 'lucide-react';

interface ProductLandingPageProps {
  product: Product;
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  onAddToCart: (cartItem: CartItem) => void;
  settings: IntegrationSettings;
  onOrderCompleted?: (order: OrderRecord) => void;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  product,
  onNavigate,
  currency,
  onAddToCart,
  settings,
  onOrderCompleted,
}) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(
    product.variations[0]
  );
  const [selectedCutOrGrind, setSelectedCutOrGrind] = useState<string>(
    selectedVariation.cutOrGrindOptions ? selectedVariation.cutOrGrindOptions[0] : ''
  );
  const [selectedHeatLevel, setSelectedHeatLevel] = useState<string>(
    selectedVariation.heatLevels ? selectedVariation.heatLevels[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'sourcing' | 'ingredients' | 'culinary' | 'storage'>('ingredients');

  // Direct checkout quick modal state
  const [showDirectOrderModal, setShowDirectOrderModal] = useState<boolean>(false);
  const [directCustomerName, setDirectCustomerName] = useState<string>('');
  const [directPhone, setDirectPhone] = useState<string>('');
  const [directAddress, setDirectAddress] = useState<string>('');
  const [directZone, setDirectZone] = useState<'southwest' | 'nigeria-wide' | 'diaspora-international'>('southwest');
  const [directNotes, setDirectNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [directFeedback, setDirectFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Update dependent options when variation changes
  const handleVariationChange = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    if (variation.cutOrGrindOptions && variation.cutOrGrindOptions.length > 0) {
      setSelectedCutOrGrind(variation.cutOrGrindOptions[0]);
    } else {
      setSelectedCutOrGrind('');
    }
    if (variation.heatLevels && variation.heatLevels.length > 0) {
      setSelectedHeatLevel(variation.heatLevels[0]);
    } else {
      setSelectedHeatLevel('');
    }
  };

  const lineTotalNgn = selectedVariation.priceNgn * quantity;

  const currentZoneConfig = settings.shippingZones.find(z => z.id === directZone) || settings.shippingZones[0];
  const grandTotalWithShippingNgn = lineTotalNgn + currentZoneConfig.feeNgn;

  const buildCurrentCartItem = (): CartItem => ({
    cartItemId: `${product.id}_${selectedVariation.id}_${Date.now()}`,
    product,
    variation: selectedVariation,
    selectedCutOrGrind: selectedCutOrGrind || undefined,
    selectedHeatLevel: selectedHeatLevel || undefined,
    quantity,
  });

  const handleAddToCartClick = () => {
    const item = buildCurrentCartItem();
    onAddToCart(item);
  };

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const triggerDirectWhatsAppOrder = async () => {
    if (!directPhone.trim()) {
      setDirectFeedback({ type: 'error', message: 'Please enter your WhatsApp or phone number.' });
      return;
    }

    setIsSubmitting(true);
    setDirectFeedback(null);

    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);
    const item = buildCurrentCartItem();

    const customerData = {
      customerName: directCustomerName || 'Customer',
      phone: directPhone,
      email: '',
      address: directAddress || 'Confirm on WhatsApp',
      city: 'Southwest / Nigeria',
      stateOrRegion: 'Lagos',
      country: 'Nigeria',
      deliveryZone: directZone,
      notes: directNotes,
      preferredContact: 'whatsapp' as const,
    };

    const orderRecord: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      date: new Date().toISOString(),
      customer: customerData,
      items: [item],
      totalNgn: grandTotalWithShippingNgn,
      currency,
      totalInCurrency: grandTotalWithShippingNgn,
      status: 'new',
      channel: 'whatsapp',
      webhookDispatched: false,
    };

    // Auto dispatch webhook
    if (settings.enableAutoWebhookDispatch) {
      try {
        const res = await dispatchOrderWebhook(orderRecord, settings);
        orderRecord.webhookDispatched = res.success;
        orderRecord.webhookResponseStatus = res.statusCode;
      } catch (err) {
        console.warn('Webhook auto-dispatch note:', err);
      }
    }

    // Build message and launch WhatsApp
    const message = generateWhatsAppOrderMessage({
      customer: customerData,
      items: [item],
      currency,
      settings,
      orderNumber,
      shippingFeeNgn: currentZoneConfig.feeNgn,
    });

    openWhatsAppChat({
      phone: settings.whatsappNumber,
      message,
      defaultCountryCode: settings.whatsappCountryCode,
    });

    if (onOrderCompleted) {
      onOrderCompleted(orderRecord);
    }

    setIsSubmitting(false);
    setDirectFeedback({
      type: 'success',
      message: `Order #${orderNumber} generated! Opening WhatsApp with Akinnike Ols Concierge...`,
    });

    setTimeout(() => {
      setShowDirectOrderModal(false);
      setDirectFeedback(null);
    }, 3000);
  };

  const triggerDirectWebhookOnly = async () => {
    if (!directPhone.trim()) {
      setDirectFeedback({ type: 'error', message: 'Please enter your phone number to receive confirmation.' });
      return;
    }

    setIsSubmitting(true);
    setDirectFeedback(null);

    const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);
    const item = buildCurrentCartItem();

    const customerData = {
      customerName: directCustomerName || 'Direct API Customer',
      phone: directPhone,
      email: '',
      address: directAddress || 'Provided in follow-up',
      city: 'Southwest / Nigeria',
      stateOrRegion: 'Lagos',
      country: 'Nigeria',
      deliveryZone: directZone,
      notes: directNotes,
      preferredContact: 'whatsapp' as const,
    };

    const orderRecord: OrderRecord = {
      id: 'ord_' + Date.now(),
      orderNumber,
      date: new Date().toISOString(),
      customer: customerData,
      items: [item],
      totalNgn: grandTotalWithShippingNgn,
      currency,
      totalInCurrency: grandTotalWithShippingNgn,
      status: 'new',
      channel: 'webhook_api',
      webhookDispatched: false,
    };

    const res = await dispatchOrderWebhook(orderRecord, settings);
    orderRecord.webhookDispatched = res.success;
    orderRecord.webhookResponseStatus = res.statusCode;

    if (onOrderCompleted) {
      onOrderCompleted(orderRecord);
    }

    setIsSubmitting(false);
    setDirectFeedback({
      type: 'success',
      message: `Payload successfully dispatched to ${settings.webhookUrl}. Order #${orderNumber} logged!`,
    });

    setTimeout(() => {
      setShowDirectOrderModal(false);
      setDirectFeedback(null);
    }, 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pantry Essentials</span>
        </button>

        <button
          onClick={handleShareClick}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 bg-[#1D1713] border border-[#2E241D] px-3 py-1.5 rounded-lg transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Landing Page'}</span>
        </button>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Visual Canvas & Artwork */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#3B2C21] bg-[#16110D] shadow-2xl">
            <ProductArtwork slug={product.slug} aspect="4/3" />
          </div>

          {/* Sourcing & Quality Proof Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#17120E] border border-[#2A2018] text-center text-xs text-stone-300">
            <div>
              <p className="font-mono text-amber-500 font-bold">100% PURE</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Zero MSG & Preservatives</p>
            </div>
            <div className="border-x border-[#2A2018]">
              <p className="font-mono text-amber-500 font-bold">SOUTHWEST</p>
              <p className="text-[11px] text-stone-500 mt-0.5">24 - 48h Express Dispatch</p>
            </div>
            <div>
              <p className="font-mono text-amber-500 font-bold">EXPORT GRADE</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Airtight Aromalock Seal</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Variations */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500">
                {product.categoryName}
              </span>
              <span className="text-stone-600">·</span>
              <span className="text-xs font-mono text-stone-400">SKU: {selectedVariation.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
              {product.name}
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Baseline */}
          <div className="p-4 rounded-xl bg-[#1C1612] border border-[#2F241C] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-stone-400 block">Current Configuration Price:</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
                  {formatPrice(selectedVariation.priceNgn, currency)}
                </span>
                {currency !== 'NGN' && (
                  <span className="text-xs text-stone-500 font-mono">
                    (₦{selectedVariation.priceNgn.toLocaleString('en-NG')})
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-700/40 px-2.5 py-1 rounded-full font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Fresh Small-Batch Ready
              </span>
            </div>
          </div>

          {/* Variation Selector: Size / Pack */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center justify-between">
              <span>Select Pack Size / Vessel</span>
              <span className="text-[11px] text-stone-500 font-normal">
                {selectedVariation.name}
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.variations.map((v) => {
                const isSelected = selectedVariation.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVariationChange(v)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-600/70 text-amber-200 shadow-md'
                        : 'bg-[#181310] border-[#291F18] text-stone-400 hover:bg-[#201914] hover:text-stone-200'
                    }`}
                  >
                    <div className="font-semibold text-stone-200">{v.name}</div>
                    <div className="mt-1 font-mono text-amber-400 font-bold">
                      {formatPrice(v.priceNgn, currency)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Variation Selector: Cut or Grind */}
          {selectedVariation.cutOrGrindOptions && selectedVariation.cutOrGrindOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-500" />
                <span>Cut or Grind Style</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedVariation.cutOrGrindOptions.map((opt) => {
                  const isSelected = selectedCutOrGrind === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSelectedCutOrGrind(opt)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-[#181310] border-[#2A2018] text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variation Selector: Heat / Flavour Level */}
          {selectedVariation.heatLevels && selectedVariation.heatLevels.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Heat / Spice Profile</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedVariation.heatLevels.map((lvl) => {
                  const isSelected = selectedHeatLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setSelectedHeatLevel(lvl)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-red-950/40 border-red-600/70 text-red-200'
                          : 'bg-[#181310] border-[#2A2018] text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Quantity:
            </span>
            <div className="flex items-center gap-3 bg-[#181310] border border-[#2B211A] rounded-xl px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-400 hover:text-white p-1"
              >
                -
              </button>
              <span className="font-mono text-sm font-bold text-stone-100 min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-400 hover:text-white p-1"
              >
                +
              </button>
            </div>

            <div className="text-xs text-stone-400">
              Total: <span className="font-mono font-bold text-amber-400">{formatPrice(lineTotalNgn, currency)}</span>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="pt-3 space-y-3">
            {/* Primary CTA: 1-Click WhatsApp Direct Order */}
            <button
              onClick={() => setShowDirectOrderModal(true)}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant Order via WhatsApp (07051377659)</span>
            </button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCartClick}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#221B16] hover:bg-[#2C231C] border border-[#3A2D23] text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span>Add to Pantry Bag</span>
              </button>

              <button
                onClick={() => setShowDirectOrderModal(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A1410] hover:bg-[#221B16] border border-[#33261D] text-stone-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-500" />
                <span>API Webhook Order</span>
              </button>
            </div>
          </div>

          {/* Logistics Summary */}
          <div className="pt-2 text-xs text-stone-400 space-y-2 border-t border-[#261E18]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Southwest Hub: 24 - 48h express delivery across Lagos & Ibadan.</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Aroma-sealed freshness guaranteed for up to 18 months.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed In-Depth Information */}
      <div className="border-t border-[#241D17] pt-12 space-y-8">
        <div className="flex items-center gap-4 border-b border-[#241D17] overflow-x-auto pb-2">
          {[
            { id: 'ingredients', label: 'Artisanal Ingredients & Provenance' },
            { id: 'culinary', label: 'Culinary Pairings & Recipes' },
            { id: 'sourcing', label: 'Sourcing & Heritage Craft' },
            { id: 'storage', label: 'Storage & Freshness Advice' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-amber-400 border-amber-500'
                  : 'text-stone-400 border-transparent hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[#17120E] border border-[#2B2018] rounded-2xl p-6 sm:p-8">
          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                Pure, Unadulterated Ingredients
              </h3>
              <p className="text-xs text-stone-400">
                Every component is hand-inspected, cleaned, dried under solar heat, and milled in small batches.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E1713] border border-[#2F241C] text-xs text-stone-300"
                  >
                    <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'culinary' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                How to Use in Your Kitchen
              </h3>
              <p className="text-xs text-stone-400">
                Specially formulated to unlock maximum umami and aroma without tedious prep work.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.culinaryUses.map((use, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E1713] border border-[#2F241C] text-xs text-stone-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sourcing' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                Traditional Craftsmanship Meets Modern Hygiene
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {product.longDescription}
              </p>
              <div className="p-4 rounded-xl bg-[#1D1713] border border-amber-600/30 text-xs text-amber-200 mt-2">
                <span className="font-bold">Origin & Milling:</span> {product.originAndProcess}
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-100">
                Pantry Storage & Shelf Life
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {product.storageInstructions}
              </p>
              <div className="p-4 rounded-xl bg-[#1D1713] border border-[#2F241C] text-xs text-stone-400">
                <p>
                  Our amber glass jars and UV-protective pouches prevent light degradation of natural essential oils. Keep away from humid steam directly above cooking pots when sprinkling.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verified Customer Reviews */}
      {product.featuredReviews && product.featuredReviews.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-stone-100">
            Kitchen Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.featuredReviews.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                  "{rev.quote}"
                </p>
                <div className="text-xs text-stone-400 pt-2 border-t border-[#261E18]">
                  <span className="font-semibold text-stone-200">{rev.author}</span> · {rev.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK ORDER MODAL */}
      {showDirectOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181310] border border-[#33261D] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C211A]">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-100">
                  Quick Order: {product.name}
                </h3>
                <p className="text-xs text-stone-400">
                  {selectedVariation.name} ({quantity}x)
                </p>
              </div>
              <button
                onClick={() => setShowDirectOrderModal(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#241C16]"
              >
                ✕
              </button>
            </div>

            {directFeedback && (
              <div
                className={`p-3 rounded-xl text-xs ${
                  directFeedback.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-200'
                    : 'bg-red-950/60 border border-red-700 text-red-200'
                }`}
              >
                {directFeedback.message}
              </div>
            )}

            {/* Price Preview */}
            <div className="p-3.5 rounded-xl bg-[#1F1813] border border-[#2F241C] flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400">Total with Est. Shipping ({directZone}):</span>
                <div className="font-mono text-base font-bold text-amber-400">
                  {formatPrice(grandTotalWithShippingNgn, currency)}
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Qty: {quantity}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={directCustomerName}
                  onChange={(e) => setDirectCustomerName(e.target.value)}
                  placeholder="e.g. Adeola Johnson"
                  className="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  value={directPhone}
                  onChange={(e) => setDirectPhone(e.target.value)}
                  placeholder="e.g. 08012345678"
                  className="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Delivery Destination Zone</label>
                <select
                  value={directZone}
                  onChange={(e) => setDirectZone(e.target.value as any)}
                  className="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="southwest">Southwest Nigeria Express (Lagos, Ibadan, Ogun) · ₦2,500</option>
                  <option value="nigeria-wide">Nationwide Nigeria (Interstate Courier) · ₦4,500</option>
                  <option value="diaspora-international">African Continental & Diaspora (DHL Export) · ₦28,000</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={directAddress}
                  onChange={(e) => setDirectAddress(e.target.value)}
                  placeholder="Street address, city, area"
                  className="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Special Notes / Grind preference</label>
                <input
                  type="text"
                  value={directNotes}
                  onChange={(e) => setDirectNotes(e.target.value)}
                  placeholder="e.g. Extra fine grind, leave with front desk"
                  className="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={triggerDirectWhatsAppOrder}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Confirm & Chat on WhatsApp ({settings.whatsappNumber})</span>
              </button>

              <button
                type="button"
                onClick={triggerDirectWebhookOnly}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#221A15] hover:bg-[#2C211B] border border-[#33261D] text-stone-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-500" />
                <span>Dispatch to Nodus Webhook API</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
