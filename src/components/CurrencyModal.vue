<template>
  <div
    v-if="store.isCurrencyModalOpen.value"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
  >
    <div class="bg-[#181310] border border-[#33271F] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
      <div class="flex items-center justify-between pb-4 border-b border-[#2B211A]">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Globe class="w-4 h-4" />
          </div>
          <div>
            <h3 class="text-base font-serif font-bold text-stone-100">Select Display Currency</h3>
            <p class="text-xs text-stone-400">All prices show dual conversion (~₦ Naira base)</p>
          </div>
        </div>
        <button
          @click="store.closeCurrencyModal()"
          class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#251D17] transition-colors cursor-pointer"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        <button
          v-for="(info, code) in config.currencies"
          :key="code"
          @click="handleSelect(code as CurrencyCode)"
          :class="[
            'w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer',
            currency === code
              ? 'bg-amber-950/40 border-amber-600/60 text-amber-200'
              : 'bg-[#1F1915] border-[#2C221B] text-stone-300 hover:bg-[#28201B] hover:text-white'
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#140F0D] border border-[#3A2D24] flex items-center justify-center font-mono font-bold text-amber-400 text-sm">
              {{ info.symbol }}
            </span>
            <div>
              <div class="font-medium text-sm flex items-center gap-2">
                <span>{{ info.label }}</span>
                <span
                  v-if="code === 'NGN'"
                  class="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-700/40"
                >
                  Base
                </span>
              </div>
              <div class="text-[11px] text-stone-500 font-mono">
                {{ code === 'NGN' ? 'Primary Domestic Base' : `~1 ${code} = ₦${info.rateToNgn.toLocaleString('en-NG')}` }}
              </div>
            </div>
          </div>

          <div
            v-if="currency === code"
            class="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center"
          >
            <Check class="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </button>
      </div>

      <div class="mt-5 pt-3 border-t border-[#2B211A] text-center">
        <p class="text-[11px] text-stone-500">
          WhatsApp checkout messages automatically include both your selected currency estimate and official base Naira values.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePantryStore } from '../stores/pantry';
import { CurrencyCode } from '../types';
import { Globe, X, Check } from 'lucide-vue-next';

const store = usePantryStore();
const { config, currency } = store;

const handleSelect = (code: CurrencyCode) => {
  store.setCurrency(code);
  store.closeCurrencyModal();
};
</script>
