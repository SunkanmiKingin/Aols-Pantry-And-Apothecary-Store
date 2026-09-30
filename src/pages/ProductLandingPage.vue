<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
    <!-- Breadcrumb & Top Bar -->
    <div class="flex items-center justify-between">
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Back to The Atelier</span>
      </router-link>

      <button
        @click="copyShareLink"
        class="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 bg-[#1D1713] border border-[#2E241D] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <Share2 class="w-3.5 h-3.5" />
        <span>{{ linkCopied ? 'Link Copied!' : 'Share Landing Page' }}</span>
      </button>
    </div>

    <!-- Product Showcase Module -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- Left Column: Visual Artwork & Badges -->
      <div class="lg:col-span-6 space-y-6">
        <div class="relative rounded-2xl overflow-hidden border border-[#3B2C21] bg-[#16110D] shadow-2xl">
          <ProductArtwork :slug="product.slug" aspect="4/3" />
        </div>

        <!-- Sourcing Proof Strip -->
        <div class="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#17120E] border border-[#2A2018] text-center text-xs text-stone-300">
          <div>
            <p class="font-mono text-amber-500 font-bold">100% PURE</p>
            <p class="text-[11px] text-stone-500 mt-0.5">Zero MSG & Preservatives</p>
          </div>
          <div class="border-x border-[#2A2018]">
            <p class="font-mono text-amber-500 font-bold">SOUTHWEST</p>
            <p class="text-[11px] text-stone-500 mt-0.5">24 - 48h Express Dispatch</p>
          </div>
          <div>
            <p class="font-mono text-amber-500 font-bold">EXPORT READY</p>
            <p class="text-[11px] text-stone-500 mt-0.5">Airtight Vacuum Foil</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Purchase Module & Variations -->
      <div class="lg:col-span-6 space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs uppercase font-mono tracking-widest text-amber-500">
              {{ product.categoryName }}
            </span>
            <span class="text-stone-600">·</span>
            <span class="text-xs font-mono text-stone-400">SKU: {{ selectedVariation.sku }}</span>
          </div>

          <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
            {{ product.name }}
          </h1>

          <p class="text-sm text-stone-300 leading-relaxed font-light">
            {{ product.tagline }}
          </p>
        </div>

        <!-- Live Price Preview with Dual Currency -->
        <div class="p-4 rounded-xl bg-[#1C1612] border border-[#2F241C] flex items-center justify-between">
          <div>
            <span class="text-[11px] text-stone-400 block">Current Configuration Price:</span>
            <div class="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
              {{ formatPrice(selectedVariation.priceNgn, currency, true) }}
            </div>
          </div>

          <div class="text-right">
            <span class="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-700/40 px-2.5 py-1 rounded-full font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Small-Batch Ready
            </span>
          </div>
        </div>

        <!-- Variation 1: Sizes & Vessels (Includes 1kg option) -->
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center justify-between">
            <span>Select Pack Size / Vessel</span>
            <span class="text-[11px] text-stone-500 font-normal">
              {{ selectedVariation.name }}
            </span>
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              v-for="v in product.variations"
              :key="v.id"
              @click="handleVariationChange(v)"
              :class="[
                'p-3 rounded-xl border text-left text-xs transition-all cursor-pointer',
                selectedVariation.id === v.id
                  ? 'bg-amber-950/40 border-amber-600/70 text-amber-200 shadow-md'
                  : 'bg-[#181310] border-[#291F18] text-stone-400 hover:bg-[#201914] hover:text-stone-200'
              ]"
            >
              <div class="font-semibold text-stone-200">{{ v.name }}</div>
              <div class="mt-1 font-mono text-amber-400 font-bold">
                {{ formatPrice(v.priceNgn, currency, true) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Variation 2: Cut or Grind Style -->
        <div v-if="selectedVariation.cutOrGrindOptions && selectedVariation.cutOrGrindOptions.length > 0" class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <Scale class="w-3.5 h-3.5 text-amber-500" />
            <span>Cut / Grind Style</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in selectedVariation.cutOrGrindOptions"
              :key="opt"
              @click="selectedCutOrGrind = opt"
              :class="[
                'px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                selectedCutOrGrind === opt
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-[#181310] border-[#2A2018] text-stone-400 hover:text-stone-200'
              ]"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Variation 3: Heat Level / Flavour Profile -->
        <div v-if="selectedVariation.heatLevels && selectedVariation.heatLevels.length > 0" class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
            <Flame class="w-3.5 h-3.5 text-amber-500" />
            <span>Heat & Flavour Calibration</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="lvl in selectedVariation.heatLevels"
              :key="lvl"
              @click="selectedHeatLevel = lvl"
              :class="[
                'px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer',
                selectedHeatLevel === lvl
                  ? 'bg-red-950/40 border-red-600/70 text-red-200'
                  : 'bg-[#181310] border-[#2A2018] text-stone-400 hover:text-stone-200'
              ]"
            >
              {{ lvl }}
            </button>
          </div>
        </div>

        <!-- Dietary / Allergen Chips -->
        <div v-if="selectedVariation.dietaryBadges" class="flex flex-wrap gap-2 pt-1">
          <span
            v-for="(badge, bIdx) in selectedVariation.dietaryBadges"
            :key="bIdx"
            class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1F1713] border border-[#33241B] text-amber-400/90"
          >
            {{ badge }}
          </span>
        </div>

        <!-- Quantity Stepper -->
        <div class="flex items-center gap-4 pt-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-stone-300">
            Quantity:
          </span>
          <div class="flex items-center gap-3 bg-[#181310] border border-[#2B211A] rounded-xl px-3 py-1.5">
            <button
              @click="quantity = Math.max(1, quantity - 1)"
              class="text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              -
            </button>
            <span class="font-mono text-sm font-bold text-stone-100 min-w-[20px] text-center">
              {{ quantity }}
            </span>
            <button
              @click="quantity = quantity + 1"
              class="text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              +
            </button>
          </div>

          <div class="text-xs text-stone-400">
            Total: <span class="font-mono font-bold text-amber-400">{{ formatPrice(lineTotalNgn, currency, true) }}</span>
          </div>
        </div>

        <!-- SEPARATE DISTINCT ACTION BUTTONS (OPTION B) -->
        <div class="pt-3 space-y-3">
          <!-- Button 1: Instant WhatsApp Checkout -->
          <button
            @click="openDirectModal('whatsapp')"
            class="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 text-neutral-950 font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <MessageCircle class="w-5 h-5 fill-current" />
            <span>Instant Order via WhatsApp ({{ config?.channels?.whatsapp?.number || '07051377659' }})</span>
          </button>

          <!-- Button 2: Order on Website & Secondary Bag Button -->
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="openDirectModal('website')"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#221A15] hover:bg-[#2C211B] border border-amber-600/40 text-amber-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Send class="w-4 h-4 text-amber-500" />
              <span>Order on Website (API)</span>
            </button>

            <button
              @click="handleAddToCart"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A1410] hover:bg-[#221B16] border border-[#33261D] text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <ShoppingBag class="w-4 h-4 text-amber-500" />
              <span>+ Add to Pantry Bag</span>
            </button>
          </div>
        </div>

        <!-- Logistics Range Notice -->
        <div class="pt-2 text-xs text-stone-400 space-y-2 border-t border-[#261E18]">
          <div class="flex items-center gap-2">
            <Truck class="w-4 h-4 text-amber-500" />
            <span>Southwest Hub: 24 - 48h express delivery (Est: ₦2,000 – ₦3,500).</span>
          </div>
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4 text-emerald-500" />
            <span>Freshness guaranteed in aromalock seal for up to 18 months.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Standardized Extensible In-Depth Tabs -->
    <div class="border-t border-[#241D17] pt-12 space-y-8">
      <div class="flex items-center gap-4 border-b border-[#241D17] overflow-x-auto pb-2">
        <button
          v-for="tab in infoTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer',
            activeTab === tab.id
              ? 'text-amber-400 border-amber-500'
              : 'text-stone-400 border-transparent hover:text-stone-200'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="bg-[#17120E] border border-[#2B2018] rounded-2xl p-6 sm:p-8">
        <!-- Ingredients Tab -->
        <div v-if="activeTab === 'ingredients'" class="space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Pure, Unadulterated Ingredients & Provenance
          </h3>
          <p class="text-xs text-stone-400">
            Every component is hand-cleaned, dried under solar heat, and stone-milled in small batches.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              v-for="(ing, i) in product.ingredients"
              :key="i"
              class="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E1713] border border-[#2F241C] text-xs text-stone-300"
            >
              <Leaf class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{{ ing }}</span>
            </div>
          </div>
        </div>

        <!-- Culinary Uses Tab -->
        <div v-else-if="activeTab === 'culinary'" class="space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Culinary Pairings & How to Cook
          </h3>
          <p class="text-xs text-stone-400">
            Specially formulated to unlock maximum umami and aroma without tedious prep work.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              v-for="(use, i) in product.culinaryUses"
              :key="i"
              class="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E1713] border border-[#2F241C] text-xs text-stone-300"
            >
              <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{{ use }}</span>
            </div>
          </div>
        </div>

        <!-- Sourcing Tab -->
        <div v-else-if="activeTab === 'sourcing'" class="space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Traditional Craftsmanship & Sourcing
          </h3>
          <p class="text-sm text-stone-300 leading-relaxed font-light">
            {{ product.longDescription }}
          </p>
          <div class="p-4 rounded-xl bg-[#1D1713] border border-amber-600/30 text-xs text-amber-200 mt-2">
            <span class="font-bold">Origin & Milling:</span> {{ product.originAndProcess }}
          </div>
        </div>

        <!-- Storage Tab -->
        <div v-else-if="activeTab === 'storage'" class="space-y-4">
          <h3 class="font-serif text-xl font-bold text-stone-100">
            Pantry Storage & Freshness
          </h3>
          <p class="text-sm text-stone-300 leading-relaxed font-light">
            {{ product.storageInstructions }}
          </p>
          <div class="p-4 rounded-xl bg-[#1D1713] border border-[#2F241C] text-xs text-stone-400">
            Amber apothecary vessels and UV-shield foil prevent light degradation of natural essential oils.
          </div>
        </div>
      </div>
    </div>

    <!-- Verified Customer Reviews -->
    <div v-if="product.featuredReviews && product.featuredReviews.length > 0" class="space-y-6">
      <h3 class="font-serif text-2xl font-bold text-stone-100">
        Verified Kitchen Testimonials
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(rev, i) in product.featuredReviews"
          :key="i"
          class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3"
        >
          <div class="flex items-center gap-1 text-amber-400">
            <span v-for="star in rev.rating" :key="star">★</span>
          </div>
          <p class="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
            "{{ rev.quote }}"
          </p>
          <div class="text-xs text-stone-400 pt-2 border-t border-[#261E18]">
            <span class="font-semibold text-stone-200">{{ rev.author }}</span> · {{ rev.location }}
          </div>
        </div>
      </div>
    </div>

    <!-- STANDARDIZED DIRECT CHECKOUT MODAL (For both WhatsApp & Website Option B) -->
    <div
      v-if="showDirectModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div class="bg-[#181310] border border-[#33261D] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-[#2C211A]">
          <div>
            <h3 class="font-serif text-lg font-bold text-stone-100">
              {{ directMode === 'whatsapp' ? 'Instant WhatsApp Checkout' : 'Order on Website' }}
            </h3>
            <p class="text-xs text-stone-400">
              {{ product.name }} · {{ selectedVariation.name }} ({{ quantity }}x)
            </p>
          </div>
          <button
            @click="showDirectModal = false"
            class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#241C16] cursor-pointer"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Alert messages -->
        <div
          v-if="directFeedback"
          class="p-3 rounded-xl text-xs bg-red-950/60 border border-red-700 text-red-200 flex items-center gap-2"
        >
          <AlertCircle class="w-4 h-4 text-red-400 shrink-0" />
          <span>{{ directFeedback }}</span>
        </div>

        <!-- Price & Shipping Range Preview -->
        <div class="p-3.5 rounded-xl bg-[#1F1813] border border-[#2F241C] flex items-center justify-between text-xs">
          <div>
            <span class="text-stone-400">Subtotal:</span>
            <div class="font-mono text-base font-bold text-amber-400">
              {{ formatPrice(lineTotalNgn, currency, true) }}
            </div>
          </div>
          <div class="text-right">
            <span class="text-stone-400">Est. Shipping Range:</span>
            <div class="font-mono text-stone-300 font-semibold">{{ currentZoneRange }}</div>
          </div>
        </div>

        <!-- Inputs Form -->
        <div class="space-y-3 text-xs">
          <div>
            <label class="block text-stone-400 mb-1">Your Full Name *</label>
            <input
              type="text"
              v-model="directCustomer.customerName"
              placeholder="e.g. Adeola Johnson"
              class="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label class="block text-stone-400 mb-1">WhatsApp / Phone Number *</label>
            <input
              type="tel"
              v-model="directCustomer.phone"
              placeholder="e.g. 07051377659"
              class="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label class="block text-stone-400 mb-1">Delivery Destination Zone</label>
            <select
              v-model="directCustomer.deliveryZone"
              class="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option
                v-for="zone in config.shippingEstimates"
                :key="zone.id"
                :value="zone.id"
              >
                {{ zone.name }} · ₦{{ zone.minNgn.toLocaleString('en-NG') }} – ₦{{ zone.maxNgn.toLocaleString('en-NG') }} ({{ zone.deliveryDays }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-stone-400 mb-1">Delivery Address *</label>
            <input
              type="text"
              v-model="directCustomer.address"
              placeholder="House, Street name, Estate, Area"
              class="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label class="block text-stone-400 mb-1">Special Notes / Grind & Allergen Instructions</label>
            <input
              type="text"
              v-model="directCustomer.notes"
              placeholder="e.g. Extra fine grind, leave with front gate"
              class="w-full bg-[#140F0D] border border-[#2B211A] rounded-lg px-3 py-2 text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <!-- Action Submit -->
        <div class="pt-2">
          <!-- When in WhatsApp Mode -->
          <button
            v-if="directMode === 'whatsapp'"
            type="button"
            @click="submitDirectWhatsApp"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <MessageCircle class="w-4 h-4 fill-current" />
            <span>Confirm & Open WhatsApp ({{ config?.channels?.whatsapp?.number || '07051377659' }})</span>
          </button>

          <!-- When in Website Mode -->
          <button
            v-else
            type="button"
            @click="submitDirectWebsite"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Send class="w-4 h-4" />
            <span>Submit Order to Nodus Webhook API</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-20 space-y-4">
    <p class="font-serif text-xl text-stone-300">Pantry item not found</p>
    <router-link to="/" class="text-amber-400 hover:underline text-xs">
      Return to The Atelier
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePantryStore } from '../stores/pantry';
import { ProductVariation, CartItem, CustomerOrderData } from '../types';
import { formatPrice } from '../utils/currency';
import ProductArtwork from '../components/ProductArtwork.vue';
import {
  ArrowLeft,
  Share2,
  Scale,
  Flame,
  MessageCircle,
  Send,
  ShoppingBag,
  Truck,
  Clock,
  Leaf,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-vue-next';

const route = useRoute();
const store = usePantryStore();
const { products, config, currency } = store;

const product = computed(() => {
  const slug = route.params.slug as string;
  return products.value.find((p) => p.slug === slug);
});

const selectedVariation = ref<ProductVariation>(
  product.value?.variations[0] || ({} as ProductVariation)
);
const selectedCutOrGrind = ref<string>('');
const selectedHeatLevel = ref<string>('');
const quantity = ref<number>(1);
const activeTab = ref<'ingredients' | 'culinary' | 'sourcing' | 'storage'>('ingredients');

const linkCopied = ref(false);
const showDirectModal = ref(false);
const directMode = ref<'whatsapp' | 'website'>('whatsapp');
const isSubmitting = ref(false);
const directFeedback = ref<string | null>(null);

const directCustomer = ref<CustomerOrderData>({
  customerName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  stateOrRegion: 'Lagos',
  country: 'Nigeria',
  deliveryZone: 'southwest',
  notes: '',
  preferredChannel: 'whatsapp',
});

// Update variation defaults when product loads
watch(
  product,
  (newProd) => {
    if (newProd && newProd.variations.length > 0) {
      handleVariationChange(newProd.variations[0]);
    }
  },
  { immediate: true }
);

function handleVariationChange(v: ProductVariation) {
  selectedVariation.value = v;
  if (v.cutOrGrindOptions && v.cutOrGrindOptions.length > 0) {
    selectedCutOrGrind.value = v.cutOrGrindOptions[0];
  } else {
    selectedCutOrGrind.value = '';
  }
  if (v.heatLevels && v.heatLevels.length > 0) {
    selectedHeatLevel.value = v.heatLevels[0];
  } else {
    selectedHeatLevel.value = '';
  }
}

const lineTotalNgn = computed(() => (selectedVariation.value.priceNgn || 0) * quantity.value);

const currentZoneRange = computed(() => {
  return store.getShippingRangeText(directCustomer.value.deliveryZone);
});

const infoTabs = [
  { id: 'ingredients', label: 'Artisanal Ingredients & Provenance' },
  { id: 'culinary', label: 'Culinary Pairings & Recipes' },
  { id: 'sourcing', label: 'Sourcing & Heritage Craft' },
  { id: 'storage', label: 'Storage & Freshness Advice' },
];

function buildCartItem(): CartItem {
  return {
    cartItemId: `${product.value!.id}_${selectedVariation.value.id}_${Date.now()}`,
    product: product.value!,
    variation: selectedVariation.value,
    selectedCutOrGrind: selectedCutOrGrind.value || undefined,
    selectedHeatLevel: selectedHeatLevel.value || undefined,
    quantity: quantity.value,
  };
}

function handleAddToCart() {
  const item = buildCartItem();
  store.addToCart(item);
}

function openDirectModal(mode: 'whatsapp' | 'website') {
  directMode.value = mode;
  directCustomer.value.preferredChannel = mode === 'whatsapp' ? 'whatsapp' : 'web_storefront';
  directFeedback.value = null;
  showDirectModal.value = true;
}

function validateDirectForm(): boolean {
  if (!directCustomer.value.customerName.trim()) {
    directFeedback.value = 'Please enter your name.';
    return false;
  }
  if (!directCustomer.value.phone.trim() || directCustomer.value.phone.length < 7) {
    directFeedback.value = 'Please enter a valid phone or WhatsApp number.';
    return false;
  }
  if (!directCustomer.value.address.trim()) {
    directFeedback.value = 'Please enter your delivery street address.';
    return false;
  }
  directFeedback.value = null;
  return true;
}

async function submitDirectWhatsApp() {
  if (!validateDirectForm()) return;
  isSubmitting.value = true;
  try {
    const item = buildCartItem();
    await store.initiateWhatsAppOrder(directCustomer.value, [item]);
    showDirectModal.value = false;
  } catch (err: any) {
    directFeedback.value = err?.message || 'Failed to generate WhatsApp order';
  } finally {
    isSubmitting.value = false;
  }
}

async function submitDirectWebsite() {
  if (!validateDirectForm()) return;
  isSubmitting.value = true;
  try {
    const item = buildCartItem();
    await store.submitOrderOnWebsite(directCustomer.value, [item]);
    showDirectModal.value = false;
  } catch (err: any) {
    directFeedback.value = err?.message || 'Failed to submit order to backend API';
  } finally {
    isSubmitting.value = false;
  }
}

function copyShareLink() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  }
}
</script>
