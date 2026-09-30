<template>
  <div class="space-y-24 pb-20">
    <!-- 1. Hero Section -->
    <section class="relative pt-12 md:pt-20 pb-16 overflow-hidden">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-600/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <!-- Left Column -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241A14] border border-amber-600/30 text-amber-300 text-xs font-medium tracking-wide">
              <Sparkles class="w-3.5 h-3.5 text-amber-400" />
              <span>Small-Batch Artisanal Nigerian Dry Pantry</span>
            </div>

            <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12]">
              Heritage ingredients, stone-ground for the
              <span class="italic text-amber-400 font-normal"> modern kitchen.</span>
            </h1>

            <p class="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-light">
              {{ config.brand.description }}
            </p>

            <!-- Dual Direct Action CTAs -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a
                :href="whatsAppDirectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle class="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Order ({{ config?.channels?.whatsapp?.number || '07051377659' }})</span>
              </a>

              <a
                href="#advertised-showcase"
                class="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#201914] hover:bg-[#2A211B] border border-[#3A2D23] text-stone-200 text-sm font-medium transition-colors"
              >
                <span>Explore Featured Blends</span>
                <ArrowRight class="w-4 h-4 text-amber-400" />
              </a>
            </div>

            <!-- Trust Badges -->
            <div class="pt-6 grid grid-cols-3 gap-4 border-t border-[#261E18] text-xs text-stone-400">
              <div class="flex items-center gap-2">
                <Shield class="w-4 h-4 text-amber-500 shrink-0" />
                <span>100% Clean & Zero Fillers</span>
              </div>
              <div class="flex items-center gap-2">
                <Leaf class="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Solar Dehydration</span>
              </div>
              <div class="flex items-center gap-2">
                <Truck class="w-4 h-4 text-amber-500 shrink-0" />
                <span>Southwest Hub 24-48h</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Visual Canvas -->
          <div class="lg:col-span-5">
            <div class="relative">
              <div class="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-600/20 to-red-600/20 blur-xl opacity-75" />
              <div class="relative rounded-2xl overflow-hidden border border-[#3B2C21] bg-[#17120E] p-2 shadow-2xl">
                <ProductArtwork slug="concoction-blend" aspect="4/3" />
                <div class="p-5 space-y-3 bg-[#17120E]">
                  <div class="flex items-center justify-between">
                    <span class="text-xs uppercase tracking-widest text-amber-400 font-mono">
                      Flagship Blend
                    </span>
                    <span class="font-mono text-xs text-stone-400">Southwest Hub Ready</span>
                  </div>
                  <h3 class="font-serif text-2xl font-bold text-stone-100">
                    Signature Concoction Blend
                  </h3>
                  <p class="text-xs text-stone-400 line-clamp-2">
                    Fermented locust beans (iru), river crayfish, smoked bonga flakes, and scent leaves stone-ground into savory umami.
                  </p>
                  <div class="pt-2 flex items-center justify-between">
                    <span class="font-mono text-base font-bold text-amber-400">
                      {{ formatPrice(4500, currency, true) }}
                    </span>
                    <router-link
                      to="/landing/concoction-blend"
                      class="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-[#251C15] px-3.5 py-1.5 rounded-lg border border-amber-600/30 transition-colors"
                    >
                      <span>View Landing Page</span>
                      <ArrowRight class="w-3.5 h-3.5" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Products We Advertise First -->
    <section id="advertised-showcase" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div class="space-y-4 text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
          Priority Showcases
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          Products We Advertise First
        </h2>
        <p class="text-sm text-stone-400">
          Each blend and protein features complete allowances for sizes, cuts, and grinds with dedicated standalone landing pages connecting directly to WhatsApp and our backend orchestration API.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in advertisedProducts"
          :key="product.id"
          class="group rounded-2xl bg-[#17120E] border border-[#2B2018] hover:border-amber-600/50 p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-950/20"
        >
          <div>
            <div class="relative rounded-xl overflow-hidden mb-3">
              <ProductArtwork :slug="product.slug" aspect="4/3" />
              <span
                v-if="product.badge"
                class="absolute top-2.5 right-2.5 bg-[#120E0B]/85 backdrop-blur-md border border-amber-600/40 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded"
              >
                {{ product.badge }}
              </span>
            </div>

            <div class="space-y-2 px-1">
              <span class="text-[11px] font-mono uppercase tracking-wider text-amber-500">
                {{ product.categoryName }}
              </span>
              <h3 class="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                {{ product.description }}
              </p>
              <div class="pt-2 text-[11px] text-stone-500 font-mono">
                <span>{{ product.variations.length }} Sizes & Cuts Available</span>
              </div>
            </div>
          </div>

          <div class="pt-4 mt-4 border-t border-[#261E17] px-1 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-stone-400">Starting at:</span>
              <span class="font-mono text-sm font-bold text-amber-400">
                {{ formatPrice(product.variations[0].priceNgn, currency, true) }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-1">
              <router-link
                :to="product.landingPageUrl"
                class="w-full flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-[#221B16] hover:bg-[#2C221B] border border-[#3B2D22] text-stone-200 text-xs font-semibold transition-colors"
              >
                <Eye class="w-3.5 h-3.5 text-amber-400" />
                <span>Details</span>
              </router-link>

              <button
                @click="quickWhatsAppOrder(product)"
                class="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <MessageCircle class="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Culinary Flavour Matcher -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-br from-[#1C1612] via-[#16110D] to-[#100C09] border border-[#36271D] p-6 sm:p-10 relative overflow-hidden">
        <div class="max-w-3xl space-y-3 mb-8">
          <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
            The Apothecary Flavour Matcher
          </span>
          <h2 class="font-serif text-3xl font-bold text-stone-100">
            What are you cooking in your kitchen today?
          </h2>
          <p class="text-sm text-stone-400">
            Select your dish, and our master blending notes will pair you with the exact stone-ground aromatics.
          </p>
        </div>

        <div class="flex flex-wrap gap-2.5 mb-8">
          <button
            v-for="(guide, key) in pairingGuide"
            :key="key"
            @click="selectedDishGoal = key"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer',
              selectedDishGoal === key
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-950/40'
                : 'bg-[#221B16] text-stone-300 hover:bg-[#2B221B] border border-[#362B21]'
            ]"
          >
            {{ guide.tabTitle }}
          </button>
        </div>

        <!-- Matched Card -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#130E0B] border border-[#2B1F17] rounded-2xl p-6">
          <div class="md:col-span-4">
            <ProductArtwork :slug="currentPairing.blendSlug" aspect="4/3" />
          </div>
          <div class="md:col-span-8 space-y-4">
            <div>
              <span class="text-xs uppercase tracking-wider text-amber-500 font-mono">
                Recommended Master Pairing
              </span>
              <h3 class="font-serif text-2xl font-bold text-stone-100">
                {{ currentPairing.blendName }}
              </h3>
              <p class="text-xs text-amber-300 mt-0.5">{{ currentPairing.dish }}</p>
            </div>

            <p class="text-sm text-stone-300 leading-relaxed font-light">
              {{ currentPairing.why }}
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-3">
              <router-link
                :to="`/landing/${currentPairing.blendSlug}`"
                class="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
              >
                <span>Open Dedicated Landing Page</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>

              <button
                @click="openPairingWhatsApp(currentPairing)"
                class="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <MessageCircle class="w-3.5 h-3.5 fill-current" />
                <span>Order on WhatsApp ({{ config.channels.whatsapp.number }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Complete Storefront Collection -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
            Complete Storefront Collection
          </span>
          <h2 class="font-serif text-3xl font-bold text-stone-100 mt-1">
            The Apothecary Pantry Vault
          </h2>
        </div>

        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categoryFilters"
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer',
              activeCategory === cat.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#1C1612] text-stone-400 hover:text-stone-200 border border-[#2B211A]'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="rounded-2xl bg-[#16120F] border border-[#2B2019] hover:border-amber-600/40 p-3.5 flex flex-col justify-between transition-all group"
        >
          <div>
            <div class="rounded-xl overflow-hidden mb-3">
              <ProductArtwork :slug="product.slug" aspect="4/3" />
            </div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-amber-500">
              {{ product.categoryName }}
            </span>
            <h3 class="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-xs text-stone-400 mt-1 line-clamp-2">{{ product.description }}</p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#241C15] space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-stone-500">{{ product.variations[0].name.split(' ')[0] }}</span>
              <span class="font-mono font-bold text-amber-400">
                {{ formatPrice(product.variations[0].priceNgn, currency, true) }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <router-link
                :to="product.landingPageUrl"
                class="py-1.5 px-2 rounded-lg bg-[#221A15] hover:bg-[#2C211A] text-stone-200 text-xs font-medium text-center border border-[#362A20] transition-colors"
              >
                Landing Page
              </router-link>

              <button
                @click="quickAddToCart(product)"
                class="py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium text-center border border-amber-500/30 transition-colors cursor-pointer"
              >
                + Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Artisanal Standards -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Leaf class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Slow Solar Dehydration & Cool Milling
          </h3>
          <p class="text-xs text-stone-400 leading-relaxed">
            Industrial thermal processing scorches fragile natural aromatic oils. We solar-dehydrate our wild botanicals under low controlled heat and stone-grind them cold to preserve raw medicinal potency.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Shield class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Zero Artificial Bouillons & Fillers
          </h3>
          <p class="text-xs text-stone-400 leading-relaxed">
            Every blend derives its savory soul from real fermented locust bean crystals (iru), kiln-smoked fish, and sun-dried crayfish—never MSG, sawdust starch, artificial dyes, or excessive salt.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-[#17120E] border border-[#2C2119] space-y-4">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Truck class="w-5 h-5" />
          </div>
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Southwest Express & Global Diaspora
          </h3>
          <p class="text-xs text-stone-400 leading-relaxed">
            Operating from primary logistics hubs in Lagos and Ibadan with 24-48h express doorstep dispatch, plus export-grade vacuum sealing for diaspora homes across the UK, US, and Europe.
          </p>
        </div>
      </div>
    </section>

    <!-- 6. Multichannel AI Consultation Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#181310] to-[#1D1611] border border-emerald-700/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-3 max-w-xl">
          <span class="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Multichannel AI Concierge
          </span>
          <h2 class="font-serif text-3xl font-bold text-stone-100">
            Need custom spice grinds, 1kg+ catering tubs, or diaspora bulk orders?
          </h2>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Our backend AI orchestration connects seamlessly across WhatsApp, Telegram, and our web portal. Chat with our concierge to formulate custom batches or inquire about bulk private chef supplies.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            :href="whatsAppDirectUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 cursor-pointer"
          >
            <MessageCircle class="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp: {{ config.channels.whatsapp.number }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { Product } from '../types';
import { formatPrice } from '../utils/currency';
import { sanitizePhoneNumberForWhatsApp, openWhatsAppChat } from '../utils/whatsapp';
import ProductArtwork from '../components/ProductArtwork.vue';
import { Sparkles, MessageCircle, ArrowRight, Shield, Leaf, Truck, Eye } from 'lucide-vue-next';

const store = usePantryStore();
const { products, config, currency } = store;

const activeCategory = ref('all');
const selectedDishGoal = ref('concoction-rice');

const categoryFilters = [
  { id: 'all', label: 'All Essentials' },
  { id: 'signature-concoctions', label: 'Signature Concoctions' },
  { id: 'flavoured-proteins', label: 'Flavoured Proteins' },
  { id: 'pantry-essentials', label: 'Pantry Essentials' },
  { id: 'botanical-teas', label: 'Botanical Teas' },
];

const advertisedProducts = computed(() => products.value.filter((p) => p.advertisedFirst));

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products.value;
  return products.value.filter((p) => p.category === activeCategory.value);
});

const pairingGuide: Record<string, { tabTitle: string; dish: string; blendSlug: string; blendName: string; why: string }> = {
  'concoction-rice': {
    tabTitle: '🍚 Native Concoction Rice / Yam Asaro',
    dish: 'One-Pot Native Concoction Rice & Yam Pottage (Asaro)',
    blendSlug: 'concoction-blend',
    blendName: 'Signature Concoction Blend',
    why: 'Infused with slow-fermented iru crystals, smoked bonga flakes, and sun-dried crayfish, providing that deep ancestral woodfire taste without preparing iru from scratch.',
  },
  'pepper-soup': {
    tabTitle: '🍲 Restorative Pepper Soup Broth',
    dish: 'Restorative Catfish, Goat Meat or Oxtail Pepper Soup',
    blendSlug: 'pepper-soup-blend',
    blendName: 'Ancestral Pepper Soup Blend',
    why: 'Roasted ehuru (African nutmeg) and cracked uda pods release medicinal terpenes that open airways and soothe digestive tracts with zero harsh chemical heat.',
  },
  'quick-protein': {
    tabTitle: '🥩 Savoury Shredded Beef Protein Topping',
    dish: 'Instant High-Protein Jollof Rice & Snack Topping',
    blendSlug: 'flavoured-beef',
    blendName: 'Flavoured Shredded & Chunked Beef',
    why: 'Slow-dehydrated grass-fed prime beef shreds that soften in hot soups in 3 minutes or crunch as an exquisite protein snack right out of the pouch.',
  },
  'grilling-suya': {
    tabTitle: '🔥 Suya Barbecue, Dodo & Yam Fry',
    dish: 'Street-Style Barbecue, Dodo & Yam Fry Seasoning',
    blendSlug: 'suya-blend',
    blendName: 'Artisan Suya Spice Blend (Yaji)',
    why: 'Triple-sifted roasted groundnut powder with pungent ginger and cloves that clings evenly to hot meats, roasted sweet potatoes, and fried plantains.',
  },
};

const currentPairing = computed(() => pairingGuide[selectedDishGoal.value]);

const whatsAppDirectUrl = computed(() => {
  const cfg = config.value;
  const phone = sanitizePhoneNumberForWhatsApp(
    cfg?.channels?.whatsapp?.number || '07051377659',
    cfg?.channels?.whatsapp?.countryCode || '234'
  );
  return `https://wa.me/${phone}?text=${encodeURIComponent(cfg?.channels?.whatsapp?.welcomePrompt || '')}`;
});

const quickWhatsAppOrder = (product: Product) => {
  const variation = product.variations[0];
  const text = `Hello Akinnike Ols Pantry! I would like to order the ${product.name} (${variation.name}) priced at ${formatPrice(variation.priceNgn, currency.value, true)}. Please confirm availability.`;
  openWhatsAppChat(text);
};

const quickAddToCart = (product: Product) => {
  const variation = product.variations[0];
  store.addToCart({
    cartItemId: `${product.id}_${variation.id}_${Date.now()}`,
    product,
    variation,
    selectedCutOrGrind: variation.cutOrGrindOptions ? variation.cutOrGrindOptions[0] : undefined,
    selectedHeatLevel: variation.heatLevels ? variation.heatLevels[0] : undefined,
    quantity: 1,
  });
};

const openPairingWhatsApp = (pairing: any) => {
  const text = `Hello! I am preparing ${pairing.dish} and would like to order the ${pairing.blendName}.`;
  openWhatsAppChat(text);
};
</script>
