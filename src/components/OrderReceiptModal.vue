<template>
  <div
    v-if="store.activeReceipt.value"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
  >
    <div class="bg-[#181310] border border-amber-600/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-[#2C211A]">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-serif text-lg font-bold text-stone-100">Order Received & Dispatched</h3>
            <p class="text-[11px] text-stone-400 font-mono">
              Ref: <span class="text-amber-400 font-bold">#{{ receipt.orderNumber }}</span> · Session: {{ receipt.sessionRef }}
            </p>
          </div>
        </div>

        <button
          @click="store.closeReceipt()"
          class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#251D17] transition-colors cursor-pointer"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Backend Webhook Dispatch Badge -->
      <div class="p-3 rounded-xl bg-emerald-950/50 border border-emerald-700/50 text-emerald-200 text-xs flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Synced to Multichannel Backend Orchestration API</span>
        </div>
        <span class="font-mono text-[10px] text-emerald-400">nodus.com/api/webhooks</span>
      </div>

      <!-- Customer Summary -->
      <div class="p-3.5 rounded-xl bg-[#140F0D] border border-[#261C15] space-y-1.5 text-xs">
        <div class="text-[10px] uppercase font-mono tracking-wider text-amber-500 font-bold">
          Customer & Delivery Coordinates
        </div>
        <div class="font-semibold text-stone-200">{{ receipt.customer.customerName }}</div>
        <div class="text-stone-400 font-mono">{{ receipt.customer.phone }}</div>
        <div class="text-stone-300 text-[11px] pt-1 border-t border-[#221711]">
          {{ receipt.customer.address }}
        </div>
        <div class="text-amber-400/90 text-[11px] capitalize">
          Zone: {{ receipt.customer.deliveryZone }}
        </div>
      </div>

      <!-- Items List -->
      <div class="space-y-2">
        <div class="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">
          Ordered Pantry Items
        </div>
        <div class="divide-y divide-[#221711] rounded-xl border border-[#241A13] bg-[#140F0D] p-3 space-y-2">
          <div
            v-for="item in receipt.items"
            :key="item.cartItemId"
            class="pt-2 first:pt-0 flex items-start justify-between gap-2 text-xs"
          >
            <div>
              <span class="font-semibold text-stone-200 font-serif">{{ item.product.name }}</span>
              <div class="text-[11px] text-stone-400">
                {{ item.variation.name }}
                <span v-if="item.selectedCutOrGrind"> · {{ item.selectedCutOrGrind }}</span>
                <span v-if="item.selectedHeatLevel"> · {{ item.selectedHeatLevel }}</span>
              </div>
            </div>
            <div class="text-right font-mono font-bold text-amber-400 whitespace-nowrap">
              {{ item.quantity }}x {{ formatPrice(item.variation.priceNgn * item.quantity, receipt.currency, true) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Totals & Shipping Range -->
      <div class="p-3.5 rounded-xl bg-[#1D1612] border border-[#2F231B] space-y-2 text-xs">
        <div class="flex justify-between text-stone-300">
          <span>Items Subtotal:</span>
          <span class="font-mono font-bold text-stone-100">
            {{ formatPrice(receipt.subtotalNgn, receipt.currency, true) }}
          </span>
        </div>
        <div class="flex justify-between text-stone-300">
          <span>Estimated Shipping Range:</span>
          <span class="font-mono text-amber-400 font-bold">
            {{ receipt.shippingEstimateRange }}
          </span>
        </div>
        <p class="text-[10px] text-stone-500 pt-1 border-t border-[#261A13] leading-relaxed">
          * Final delivery courier fee will be confirmed with you via WhatsApp prior to rider dispatch based on your exact doorstep address.
        </p>
      </div>

      <!-- Dual Channel Actions -->
      <div class="space-y-2 pt-1">
        <button
          @click="sendWhatsAppCopy"
          class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 text-neutral-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
        >
          <MessageCircle class="w-4 h-4 fill-current" />
          <span>Send Copy to WhatsApp Concierge ({{ config?.channels?.whatsapp?.number || '07051377659' }})</span>
        </button>

        <button
          @click="store.closeReceipt()"
          class="w-full py-2.5 px-4 rounded-xl bg-[#221A15] hover:bg-[#2C211A] border border-[#33261D] text-stone-300 text-xs font-medium transition-colors cursor-pointer"
        >
          Close Confirmation Slip
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { formatPrice } from '../utils/currency';
import { generateWhatsAppOrderMessage, openWhatsAppChat } from '../utils/whatsapp';
import { CheckCircle2, X, MessageCircle } from 'lucide-vue-next';

const store = usePantryStore();
const { config } = store;

const receipt = computed(() => store.activeReceipt.value!);

const sendWhatsAppCopy = () => {
  if (!receipt.value) return;
  const message = generateWhatsAppOrderMessage({
    customer: receipt.value.customer,
    items: receipt.value.items,
    currency: receipt.value.currency,
    orderNumber: receipt.value.orderNumber,
    sessionRef: receipt.value.sessionRef,
    shippingRangeText: receipt.value.shippingEstimateRange,
  });
  openWhatsAppChat(message);
};
</script>
