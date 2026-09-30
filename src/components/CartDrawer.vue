<template>
  <div
    v-if="store.isCartOpen.value"
    class="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in flex justify-end"
  >
    <div class="w-full max-w-lg bg-[#14100E] border-l border-[#2E241E] h-full flex flex-col shadow-2xl relative">
      <!-- Header -->
      <div class="p-5 border-b border-[#261E18] flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-serif font-bold text-sm">
            AO
          </div>
          <div>
            <h2 class="font-serif text-lg font-bold text-stone-100">Your Pantry Bag</h2>
            <p class="text-xs text-stone-400">
              {{ cart.length }} {{ cart.length === 1 ? 'essential' : 'essentials' }} selected
            </p>
          </div>
        </div>

        <button
          @click="store.closeCart()"
          class="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-[#201813] transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Main Scrollable Body -->
      <div class="flex-1 overflow-y-auto p-5 space-y-6">
        <!-- Error alert -->
        <div
          v-if="errorMessage"
          class="p-3.5 rounded-xl bg-red-950/60 border border-red-700/50 text-red-200 text-xs flex items-center gap-2"
        >
          <AlertCircle class="w-4 h-4 text-red-400 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Empty State -->
        <div v-if="cart.length === 0" class="text-center py-16 space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-[#1C1612] border border-[#2B211A] flex items-center justify-center text-stone-500 text-2xl">
            🌿
          </div>
          <p class="font-serif text-lg text-stone-300">Your pantry bag is empty</p>
          <p class="text-xs text-stone-500 max-w-xs mx-auto">
            Explore our signature concoction blends, slow-dehydrated proteins, and ancestral herbal teas.
          </p>
          <div class="pt-2">
            <button
              @click="store.closeCart()"
              class="px-4 py-2 rounded-xl bg-[#221A15] hover:bg-[#2C211A] text-amber-300 text-xs font-semibold border border-amber-600/30 cursor-pointer"
            >
              Browse The Atelier
            </button>
          </div>
        </div>

        <!-- Items List -->
        <div v-else class="space-y-3">
          <div class="flex items-center justify-between text-xs text-stone-400 pb-1">
            <span>Selected Items</span>
            <button
              @click="store.clearCart()"
              class="text-stone-500 hover:text-red-400 transition-colors text-[11px] cursor-pointer"
            >
              Clear Bag
            </button>
          </div>

          <div
            v-for="item in cart"
            :key="item.cartItemId"
            class="p-3.5 rounded-xl bg-[#1B1511] border border-[#2B211A] space-y-2 relative"
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <h4 class="text-sm font-semibold text-stone-200 font-serif">{{ item.product.name }}</h4>
                <p class="text-xs text-stone-400">{{ item.variation.name }}</p>
              </div>
              <span class="text-xs font-mono font-bold text-amber-400 whitespace-nowrap">
                {{ formatPrice(item.variation.priceNgn * item.quantity, currency, true) }}
              </span>
            </div>

            <!-- Variation Attributes -->
            <div
              v-if="item.selectedCutOrGrind || item.selectedHeatLevel"
              class="flex flex-wrap gap-1.5 pt-0.5 text-[10px]"
            >
              <span v-if="item.selectedCutOrGrind" class="bg-[#261E18] text-amber-300 px-2 py-0.5 rounded">
                {{ item.selectedCutOrGrind }}
              </span>
              <span v-if="item.selectedHeatLevel" class="bg-[#261E18] text-stone-300 px-2 py-0.5 rounded">
                {{ item.selectedHeatLevel }}
              </span>
            </div>

            <!-- Steppers & Remove -->
            <div class="flex items-center justify-between pt-2 border-t border-[#241A14]">
              <div class="flex items-center gap-2 bg-[#140F0D] border border-[#2B211A] rounded-lg p-0.5">
                <button
                  @click="store.updateQuantity(item.cartItemId, -1)"
                  class="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <Minus class="w-3 h-3" />
                </button>
                <span class="px-2 text-xs font-mono text-stone-200">{{ item.quantity }}</span>
                <button
                  @click="store.updateQuantity(item.cartItemId, 1)"
                  class="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <Plus class="w-3 h-3" />
                </button>
              </div>

              <button
                @click="store.removeCartItem(item.cartItemId)"
                class="text-stone-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                title="Remove item"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Checkout Coordinates Form -->
        <div v-if="cart.length > 0" class="pt-4 border-t border-[#261E18] space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            Delivery Coordinates & Range
          </h3>

          <!-- Delivery Zone Picker with Ranges -->
          <div>
            <label class="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5 font-mono">
              Select Destination Zone
            </label>
            <div class="grid grid-cols-1 gap-2">
              <button
                v-for="zone in config.shippingEstimates"
                :key="zone.id"
                type="button"
                @click="customer.deliveryZone = zone.id"
                :class="[
                  'p-3 rounded-xl border text-left text-xs transition-all cursor-pointer',
                  customer.deliveryZone === zone.id
                    ? 'bg-amber-950/40 border-amber-600/70 text-amber-200'
                    : 'bg-[#181310] border-[#291F18] text-stone-300 hover:bg-[#201813]'
                ]"
              >
                <div class="flex items-center justify-between">
                  <span class="font-semibold">{{ zone.name }}</span>
                  <span class="font-mono text-amber-400 font-bold">
                    ₦{{ zone.minNgn.toLocaleString('en-NG') }} – ₦{{ zone.maxNgn.toLocaleString('en-NG') }}
                  </span>
                </div>
                <div class="text-[10px] text-stone-400 mt-1">
                  {{ zone.deliveryDays }} · {{ zone.coverage }}
                </div>
              </button>
            </div>
            <p class="text-[10px] text-stone-500 mt-1 italic">
              * Courier tariff varies by exact location and is finalized before dispatch.
            </p>
          </div>

          <!-- Customer Name & Phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-stone-400 mb-1">Your Full Name *</label>
              <input
                type="text"
                v-model="customer.customerName"
                placeholder="e.g. Tayo Akinnike"
                class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label class="block text-[11px] text-stone-400 mb-1">WhatsApp / Phone *</label>
              <input
                type="tel"
                v-model="customer.phone"
                placeholder="e.g. 08012345678"
                class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <!-- Address -->
          <div>
            <label class="block text-[11px] text-stone-400 mb-1">Delivery Street Address *</label>
            <input
              type="text"
              v-model="customer.address"
              placeholder="House/Plot, Street Name, Estate, Area"
              class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-stone-400 mb-1">City / Town</label>
              <input
                type="text"
                v-model="customer.city"
                placeholder="e.g. Ibadan or Lekki"
                class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label class="block text-[11px] text-stone-400 mb-1">State / Region</label>
              <input
                type="text"
                v-model="customer.stateOrRegion"
                placeholder="e.g. Lagos or Oyo"
                class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-[11px] text-stone-400 mb-1">Special Order Notes & Allergens</label>
            <textarea
              rows="2"
              v-model="customer.notes"
              placeholder="e.g. Extra fine grind, leave with reception, allergic to nuts"
              class="w-full bg-[#181310] border border-[#2B211A] rounded-lg px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        </div>
      </div>

      <!-- Action Footer with Option B: Distinct Buttons -->
      <div v-if="cart.length > 0" class="p-5 border-t border-[#261E18] bg-[#100D0B] space-y-4">
        <!-- Subtotal Preview -->
        <div class="space-y-1 text-xs">
          <div class="flex justify-between text-stone-300">
            <span>Items Subtotal:</span>
            <span class="font-mono font-bold text-amber-400">
              {{ formatPrice(cartSubtotalNgn, currency, true) }}
            </span>
          </div>
          <div class="flex justify-between text-stone-400 text-[11px]">
            <span>Est. Shipping Range:</span>
            <span class="font-mono text-stone-300">{{ selectedZoneRange }}</span>
          </div>
        </div>

        <!-- Separate Distinct Buttons (Option B) -->
        <div class="space-y-2.5">
          <!-- Button 1: Instant WhatsApp Checkout -->
          <button
            type="button"
            @click="handleWhatsAppCheckout"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 text-neutral-950 font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <MessageCircle class="w-4 h-4 fill-current" />
            <span>Instant Order via WhatsApp Concierge</span>
          </button>

          <!-- Button 2: Order on Website (Submits to Webhook API) -->
          <button
            type="button"
            @click="handleWebsiteCheckout"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#221A15] hover:bg-[#2C211B] border border-amber-600/40 text-amber-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send class="w-3.5 h-3.5" />
            <span>{{ isSubmitting ? 'Transmitting...' : 'Order on Website (Submit to Backend API)' }}</span>
          </button>
        </div>

        <div class="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck class="w-3.5 h-3.5 text-amber-500" />
          <span>Small-batch prepared · Southwest express logistics · Multichannel orchestrated</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { CustomerOrderData } from '../types';
import { formatPrice } from '../utils/currency';
import { X, Minus, Plus, Trash2, MessageCircle, Send, ShieldCheck, AlertCircle } from 'lucide-vue-next';

const store = usePantryStore();
const { config, currency, cart, cartSubtotalNgn } = store;

const customer = ref<CustomerOrderData>({
  customerName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  stateOrRegion: 'Lagos',
  country: 'Nigeria',
  deliveryZone: 'southwest',
  notes: '',
  preferredChannel: 'web_storefront',
});

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

const selectedZoneRange = computed(() => {
  return store.getShippingRangeText(customer.value.deliveryZone);
});

const validateForm = () => {
  if (!customer.value.customerName.trim()) {
    errorMessage.value = 'Please enter your full name.';
    return false;
  }
  if (!customer.value.phone.trim() || customer.value.phone.length < 7) {
    errorMessage.value = 'Please enter a valid phone or WhatsApp number.';
    return false;
  }
  if (!customer.value.address.trim()) {
    errorMessage.value = 'Please enter your delivery street address.';
    return false;
  }
  errorMessage.value = null;
  return true;
};

// Button 1: WhatsApp Checkout
const handleWhatsAppCheckout = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;
  try {
    await store.initiateWhatsAppOrder(customer.value);
    store.closeCart();
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to initiate WhatsApp order';
  } finally {
    isSubmitting.value = false;
  }
};

// Button 2: Order on Website
const handleWebsiteCheckout = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;
  try {
    await store.submitOrderOnWebsite(customer.value);
    store.closeCart();
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to submit order to backend API';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
