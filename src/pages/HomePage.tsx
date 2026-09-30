import React, { useState } from 'react';
import { Product, CurrencyCode, IntegrationSettings } from '../types';
import { ProductArtwork } from '../components/ProductArtwork';
import { formatPrice } from '../utils/currency';
import { MessageCircle, ArrowRight, Sparkles, CheckCircle2, Shield, Leaf, HeartHandshake, Eye } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  onAddToCart: (product: Product, variationId?: string) => void;
  settings: IntegrationSettings;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onNavigate,
  currency,
  onAddToCart,
  settings,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDishGoal, setSelectedDishGoal] = useState<string>('concoction-rice');

  // Products to advertise first as requested by the user
  const advertisedProducts = products.filter((p) => p.advertisedFirst);

  const filteredProducts =
    selectedCategoryFilter === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategoryFilter);

  const pairingGuide: Record<
    string,
    { dish: string; subtitle: string; blendSlug: string; blendName: string; why: string }
  > = {
    'concoction-rice': {
      dish: 'One-Pot Native Concoction Rice & Yam Pottage (Asaro)',
      subtitle: 'Village celebration aroma in under 30 minutes',
      blendSlug: 'concoction-blend',
      blendName: 'Signature Concoction Blend',
      why: 'Infused with slow-fermented iru crystals, smoked bonga fish, and sun-dried crayfish, providing that deep ancestral woodfire taste without preparing iru from scratch.',
    },
    'pepper-soup': {
      dish: 'Restorative Catfish, Goat Meat or Oxtail Pepper Soup',
      subtitle: 'Therapeutic and warming clear medicinal broth',
      blendSlug: 'pepper-soup-blend',
      blendName: 'Ancestral Pepper Soup Blend',
      why: 'Roasted ehuru (African nutmeg) and cracked uda pods release medicinal terpenes that open airways and soothe digestive tracts with zero harsh chemical heat.',
    },
    'quick-protein': {
      dish: 'Instant High-Protein Jollof Rice & Snack Topping',
      subtitle: 'Zero-prep grass-fed dried prime beef',
      blendSlug: 'flavoured-beef',
      blendName: 'Flavoured Shredded & Chunked Beef',
      why: 'Slow-dehydrated grass-fed prime beef shreds that soften in hot soups in 3 minutes or crunch as an exquisite protein snack right out of the pouch.',
    },
    'grilling-suya': {
      dish: 'Street-Style Barbecue, Dodo & Yam Fry Seasoning',
      subtitle: 'Northern craft yaji with double-roasted kuli-kuli',
      blendSlug: 'suya-blend',
      blendName: 'Artisan Suya Spice Blend (Yaji)',
      why: 'Triple-sifted roasted groundnut powder with pungent ginger and cloves that clings evenly to hot meats, roasted sweet potatoes, and fried plantains.',
    },
  };

  const currentPairing = pairingGuide[selectedDishGoal];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section: The Atelier & Pantry */}
      <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden">
        {/* Subtle radial background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-600/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241A14] border border-amber-600/30 text-amber-300 text-xs font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Small-Batch Artisanal Nigerian Dry Pantry</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12]">
                Heritage ingredients, stone-ground for the{' '}
                <span className="italic text-amber-400 font-normal">modern kitchen.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-light">
                Carefully sourced, prepared and blended ingredients for the modern home. From signature Nigerian spice and soup blends to dried herbs, fruits, vegetables, proteins, grains and botanical teas. Traditional craftsmanship meets modern pantry convenience.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                    'Hello Akinnike Ols Pantry! I would like to order your signature blends.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Order (07051377659)</span>
                </a>

                <button
                  onClick={() => {
                    const el = document.getElementById('advertised-showcase');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#201914] hover:bg-[#2A211B] border border-[#3A2D23] text-stone-200 text-sm font-medium transition-colors"
                >
                  <span>Explore Featured Blends</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#261E18] text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>100% Clean & Zero Fillers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Traditional Sun-Drying</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Southwest Hub & Global Express</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Flagship Visual Canvas */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-600/20 to-red-600/20 blur-xl opacity-75" />
                <div className="relative rounded-2xl overflow-hidden border border-[#3B2C21] bg-[#17120E] p-2 shadow-2xl">
                  <ProductArtwork slug="concoction-blend" aspect="4/3" />
                  <div className="p-5 space-y-3 bg-[#17120E]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                        Flagship Harvest Blend
                      </span>
                      <span className="font-mono text-xs text-stone-400">Southwest Hub Ready</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-stone-100">
                      Signature Concoction Blend
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2">
                      River crayfish, slow-cured fermented locust beans, smoked bonga fish, and native scent leaves stone-ground into pure savory umami.
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono text-base font-bold text-amber-400">
                        {formatPrice(4500, currency)}
                      </span>
                      <button
                        onClick={() => onNavigate('/landing/concoction-blend')}
                        className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-[#251C15] px-3.5 py-1.5 rounded-lg border border-amber-600/30 transition-colors"
                      >
                        <span>View Dedicated Landing Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADVERTISED FIRST SPOTLIGHT: The 4 Marquee Products */}
      <section id="advertised-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
            Direct Campaign Showcases
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Products We Advertise First
          </h2>
          <p className="text-sm text-stone-400">
            Each curated blend features full variations (sizes, heat levels, cuts, and grinds) with dedicated high-conversion landing pages connecting straight to WhatsApp and our backend webhook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advertisedProducts.map((product) => {
            const minPrice = product.variations[0].priceNgn;
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-[#17120E] border border-[#2B2018] hover:border-amber-600/50 p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-950/20"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <ProductArtwork slug={product.slug} aspect="4/3" />
                    {product.badge && (
                      <span className="absolute top-2.5 right-2.5 bg-[#120E0B]/85 backdrop-blur-md border border-amber-600/40 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 px-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500">
                      {product.categoryName}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 text-[11px] text-stone-500 font-mono">
                      <span>Available: {product.variations.length} Sizes & Variations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#261E17] px-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Starting at:</span>
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {formatPrice(minPrice, currency)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onNavigate(product.landingPageUrl)}
                      className="w-full flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-[#221B16] hover:bg-[#2C221B] border border-[#3B2D22] text-stone-200 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Details</span>
                    </button>

                    <a
                      href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                        `Hello! I want to order the ${product.name} (${product.variations[0].name}). Please confirm availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE CULINARY PAIRING GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1C1612] via-[#16110D] to-[#100C09] border border-[#36271D] p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
              The Apothecary Flavour Matcher
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-100">
              What are you cooking in your kitchen today?
            </h2>
            <p className="text-sm text-stone-400">
              Select your dish, and our master blending notes will pair you with the exact proportion of stone-ground aromatics.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <button
              onClick={() => setSelectedDishGoal('concoction-rice')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDishGoal === 'concoction-rice'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40'
                  : 'bg-[#221B16] text-stone-300 hover:bg-[#2B221B] border border-[#362B21]'
              }`}
            >
              🍚 Native Concoction Rice / Yam Asaro
            </button>
            <button
              onClick={() => setSelectedDishGoal('pepper-soup')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDishGoal === 'pepper-soup'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40'
                  : 'bg-[#221B16] text-stone-300 hover:bg-[#2B221B] border border-[#362B21]'
              }`}
            >
              🍲 Restorative Pepper Soup Broth
            </button>
            <button
              onClick={() => setSelectedDishGoal('quick-protein')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDishGoal === 'quick-protein'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40'
                  : 'bg-[#221B16] text-stone-300 hover:bg-[#2B221B] border border-[#362B21]'
              }`}
            >
              🥩 Savoury Shredded Beef Protein Topping
            </button>
            <button
              onClick={() => setSelectedDishGoal('grilling-suya')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDishGoal === 'grilling-suya'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40'
                  : 'bg-[#221B16] text-stone-300 hover:bg-[#2B221B] border border-[#362B21]'
              }`}
            >
              🔥 Suya Barbecue, Dodo & Yam Fry
            </button>
          </div>

          {/* Result Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#130E0B] border border-[#2B1F17] rounded-2xl p-6">
            <div className="md:col-span-4">
              <ProductArtwork slug={currentPairing.blendSlug} aspect="4/3" />
            </div>
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-500 font-mono">
                  Recommended Master Pairing
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-100">
                  {currentPairing.blendName}
                </h3>
                <p className="text-xs text-amber-300 mt-0.5">{currentPairing.dish}</p>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {currentPairing.why}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate(`/landing/${currentPairing.blendSlug}`)}
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
                >
                  <span>Open Dedicated Landing Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                    `Hello! I am preparing ${currentPairing.dish} and would like to order the ${currentPairing.blendName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Order on WhatsApp (07051377659)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL STORE PANTRY CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
              Complete Storefront Collection
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-100 mt-1">
              The Apothecary Pantry Vault
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Essentials' },
              { id: 'signature-concoctions', label: 'Signature Concoctions' },
              { id: 'flavoured-proteins', label: 'Flavoured Proteins' },
              { id: 'pantry-essentials', label: 'Pantry Essentials' },
              { id: 'botanical-teas', label: 'Botanical Teas' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-[#1C1612] text-stone-400 hover:text-stone-200 border border-[#2B211A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const firstVar = product.variations[0];
            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#16120F] border border-[#2B2019] hover:border-amber-600/40 p-3.5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="rounded-xl overflow-hidden mb-3">
                    <ProductArtwork slug={product.slug} aspect="4/3" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500">
                    {product.categoryName}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#241C15] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">{firstVar.name.split(' ')[0]}</span>
                    <span className="font-mono font-bold text-amber-400">
                      {formatPrice(firstVar.priceNgn, currency)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate(product.landingPageUrl)}
                      className="py-1.5 px-2 rounded-lg bg-[#221A15] hover:bg-[#2C211A] text-stone-200 text-xs font-medium text-center border border-[#362A20] transition-colors"
                    >
                      Landing Page
                    </button>
                    <button
                      onClick={() => onAddToCart(product, firstVar.id)}
                      className="py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium text-center border border-amber-500/30 transition-colors"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CRAFT & PHILOSOPHY: Why Akinnike Ols */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-100">
              Slow Sun-Drying & Cool Stone-Grinding
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Industrial heat processing destroys the delicate volatile aroma molecules of wild herbs. We dry our ingredients under gentle solar heat and stone-mill them cold to retain maximum potency and medicinal value.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-100">
              Zero Artificial Bouillon & Fillers
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every blend gets its soul from real fermented locust beans, roasted crayfish, and aromatic pods—never MSG, synthetic flavor granules, sawdust fillers, or excessive table salt.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-100">
              Southwest Logistics & Global Export
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Headquartered in Southwest Nigeria with dedicated dispatch hubs in Lagos and Ibadan, offering 24-48h express delivery, alongside certified export-sealed packaging for diaspora kitchens in the UK, US, and Canada.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP & CUSTOM BATCH CONSULTATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#181310] to-[#1D1611] border border-emerald-700/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Personal Apothecary Concierge
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-100">
              Need custom spice grind levels, catering tins, or diaspora bulk orders?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We work directly with private chefs, home caterers, and food lovers to prepare bespoke spice blends, bulk shredded proteins, and airtight diaspora travel packs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                'Hello Akinnike Ols Pantry! I am interested in custom batch consultation or bulk orders.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp: {settings.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
