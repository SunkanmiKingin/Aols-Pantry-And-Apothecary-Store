<template>
  <div class="rounded-2xl bg-[#16120F] border border-[#2B2019] hover:border-amber-600/40 p-3.5 flex flex-col justify-between transition-all group duration-300 hover:-translate-y-1 shadow-lg">
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

      <div class="space-y-1 px-0.5">
        <span class="text-[10px] font-mono uppercase tracking-wider text-amber-500">
          {{ product.categoryName }}
        </span>
        <h3 class="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
          {{ product.name }}
        </h3>
        <p class="text-xs text-stone-400 line-clamp-2 leading-relaxed">
          {{ product.description }}
        </p>
      </div>
    </div>

    <div class="pt-4 mt-4 border-t border-[#241C15] space-y-2 px-0.5">
      <div class="flex items-center justify-between text-xs">
        <span class="text-stone-500 text-[11px]">{{ firstVariant?.name?.split(' ')[0] || 'Pack' }}</span>
        <span class="font-mono font-bold text-amber-400 text-sm">
          {{ store.formatMoney(minPrice) }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-1">
        <router-link
          :to="`/products/${product.slug}`"
          class="py-2 px-2.5 rounded-lg bg-[#221B16] hover:bg-[#2C211B] text-stone-200 text-xs font-semibold text-center border border-[#362A20] transition-colors flex items-center justify-center gap-1"
        >
          <Eye class="w-3.5 h-3.5 text-amber-400" />
          <span>Details</span>
        </router-link>

        <button
          @click="quickAdd"
          class="py-2 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold text-center border border-amber-500/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <ShoppingBag class="w-3.5 h-3.5" />
          <span>+ Add</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Product, usePantryStore } from '../stores/pantry';
import ProductArtwork from './ProductArtwork.vue';
import { Eye, ShoppingBag } from 'lucide-vue-next';

const props = defineProps<{
  product: Product;
}>();

const store = usePantryStore();

const firstVariant = computed(() => props.product.variants?.[0]);
const minPrice = computed(() => firstVariant.value ? firstVariant.value.priceNgn : 4000);

function quickAdd() {
  if (!firstVariant.value) return;
  store.addToCart({
    product: props.product,
    variant: firstVariant.value,
    quantity: 1,
    cutOrGrind: firstVariant.value.cutOrGrindOptions?.[0],
    heatLevel: firstVariant.value.heatLevels?.[0],
  });
}
</script>
