<template>
  <!-- Concoction Blend -->
  <div
    v-if="slug === 'concoction-blend'"
    :class="[
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1B11] via-[#1F140D] to-[#120C07] border border-[#442817]/60 flex items-center justify-center',
      aspectClass,
      customClass
    ]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent pointer-events-none" />
    <svg viewBox="0 0 400 300" class="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="240" rx="140" ry="24" fill="#0C0805" opacity="0.8" />
      <ellipse cx="200" cy="235" rx="130" ry="18" fill="#1C140D" />
      <ellipse cx="200" cy="232" rx="120" ry="14" fill="#2A1E14" />
      <path d="M120 180 Q200 240 280 180 Q290 220 200 230 Q110 220 120 180 Z" fill="#3D2619" />
      <path d="M120 180 Q200 160 280 180 Q200 200 120 180 Z" fill="#26170E" />
      <ellipse cx="200" cy="180" rx="65" ry="16" fill="#C2410C" />
      <ellipse cx="200" cy="178" rx="55" ry="12" fill="#D97706" />
      <ellipse cx="195" cy="175" rx="42" ry="8" fill="#F59E0B" />
      <circle cx="175" cy="176" r="3" fill="#78350F" />
      <circle cx="215" cy="178" r="2.5" fill="#451A03" />
      <circle cx="190" cy="174" r="2" fill="#FEF3C7" opacity="0.7" />
      <rect x="225" y="80" width="80" height="110" rx="12" fill="#451A03" fill-opacity="0.85" stroke="#B45309" stroke-width="2" />
      <rect x="235" y="66" width="60" height="14" rx="4" fill="#78350F" stroke="#B45309" stroke-width="1" />
      <rect x="233" y="105" width="64" height="55" rx="4" fill="#F3EFEA" fill-opacity="0.95" />
      <rect x="241" y="115" width="48" height="3" rx="1" fill="#78350F" />
      <rect x="245" y="122" width="40" height="2" rx="1" fill="#92400E" />
      <circle cx="265" cy="144" r="6" fill="#D97706" />
      <path d="M110 210 Q90 190 80 215 Q100 220 110 210 Z" fill="#365314" opacity="0.9" />
      <path d="M140 225 C140 225 155 245 175 235 C170 228 150 218 140 225 Z" fill="#DC2626" />
    </svg>
    <div class="absolute bottom-3 left-3 bg-[#17110C]/80 backdrop-blur-md border border-amber-600/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-amber-300">
      CONCOCTION · SMALL BATCH
    </div>
  </div>

  <!-- Flavoured Beef -->
  <div
    v-else-if="slug === 'flavoured-beef'"
    :class="[
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#271010] via-[#1B0A0A] to-[#100606] border border-[#521E1E]/60 flex items-center justify-center',
      aspectClass,
      customClass
    ]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent pointer-events-none" />
    <svg viewBox="0 0 400 300" class="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 210 L330 180 L350 230 L90 260 Z" fill="#1C1917" stroke="#292524" stroke-width="2" />
      <path d="M220 70 L300 60 L310 180 L230 190 Z" fill="#443224" stroke="#78593E" stroke-width="1.5" />
      <polygon points="120,205 155,195 165,220 130,230" fill="#5A1A1A" stroke="#3F1212" />
      <polygon points="160,185 195,178 205,200 170,208" fill="#6E1F1F" stroke="#481515" />
      <polygon points="140,215 180,210 190,235 150,242" fill="#7F1D1D" stroke="#450A0A" />
      <path d="M100 220 Q120 215 140 225" stroke="#991B1B" stroke-width="3" stroke-linecap="round" />
      <path d="M170 215 Q190 205 210 220" stroke="#991B1B" stroke-width="3" stroke-linecap="round" />
      <circle cx="145" cy="210" r="1.5" fill="#F59E0B" />
      <circle cx="175" cy="218" r="1.5" fill="#FBBF24" />
      <circle cx="160" cy="205" r="1.5" fill="#EF4444" />
    </svg>
    <div class="absolute bottom-3 left-3 bg-[#170B0B]/80 backdrop-blur-md border border-red-700/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-red-300">
      SLOW-DEHYDRATED · PRIME BEEF
    </div>
  </div>

  <!-- Pepper Soup Blend -->
  <div
    v-else-if="slug === 'pepper-soup-blend'"
    :class="[
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2B170E] via-[#1E100A] to-[#120905] border border-[#522915]/60 flex items-center justify-center',
      aspectClass,
      customClass
    ]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-transparent to-transparent pointer-events-none" />
    <svg viewBox="0 0 400 300" class="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="220" rx="130" ry="32" fill="#1C120C" />
      <ellipse cx="200" cy="210" rx="100" ry="20" fill="#3D2417" />
      <ellipse cx="200" cy="208" rx="85" ry="15" fill="#B45309" />
      <ellipse cx="140" cy="210" rx="16" ry="13" fill="#451A03" stroke="#78350F" stroke-width="1.5" transform="rotate(-15 140 210)" />
      <path d="M120 185 Q170 195 210 180 Q190 170 120 185 Z" fill="#1F130B" stroke="#451A03" stroke-width="1" />
      <circle cx="170" cy="208" r="3" fill="#18181B" />
      <circle cx="215" cy="205" r="3" fill="#18181B" />
      <path d="M180 160 Q175 140 185 120 Q195 100 190 80" stroke="#FDE68A" stroke-width="2" stroke-linecap="round" opacity="0.4" />
      <path d="M210 165 Q220 140 210 115 Q200 90 215 70" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round" opacity="0.4" />
    </svg>
    <div class="absolute bottom-3 left-3 bg-[#140C07]/80 backdrop-blur-md border border-orange-700/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-orange-300">
      EHURU & UDA · RESTORATIVE
    </div>
  </div>

  <!-- Suya Blend -->
  <div
    v-else-if="slug === 'suya-blend'"
    :class="[
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1F0E] via-[#1F150A] to-[#120C05] border border-[#543A18]/60 flex items-center justify-center',
      aspectClass,
      customClass
    ]"
  >
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
    <svg viewBox="0 0 400 300" class="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="225" rx="140" ry="25" fill="#1C140C" />
      <rect x="230" y="70" width="70" height="130" rx="10" fill="#451A03" fill-opacity="0.75" stroke="#D97706" stroke-width="2" />
      <rect x="233" y="55" width="64" height="18" rx="4" fill="#78716C" stroke="#A8A29E" stroke-width="1" />
      <rect x="233" y="95" width="64" height="100" rx="6" fill="#D97706" fill-opacity="0.9" />
      <path d="M90 225 Q140 160 190 225 Z" fill="#B45309" />
      <path d="M100 225 Q140 170 180 225 Z" fill="#D97706" />
      <ellipse cx="95" cy="225" rx="8" ry="5" fill="#92400E" stroke="#78350F" stroke-width="1" />
    </svg>
    <div class="absolute bottom-3 left-3 bg-[#140E06]/80 backdrop-blur-md border border-amber-600/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-amber-300">
      ROASTED KULI-KULI · ARTISAN YAJI
    </div>
  </div>

  <!-- Fallback Botanical Illustration -->
  <div
    v-else
    :class="[
      'relative overflow-hidden rounded-xl bg-gradient-to-br from-[#241C16] via-[#1A1410] to-[#120D0A] border border-[#3D2E24]/60 flex items-center justify-center text-center p-6',
      aspectClass,
      customClass
    ]"
  >
    <div class="space-y-2">
      <div class="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
        AO
      </div>
      <p class="font-serif text-base text-amber-200 capitalize tracking-wide">{{ slug.replace(/-/g, ' ') }}</p>
      <p class="text-[11px] text-stone-400">Akinnike Ols Artisanal Pantry</p>
    </div>
    <div class="absolute bottom-3 left-3 bg-[#120D0A]/80 backdrop-blur-md border border-stone-700/30 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider text-stone-300">
      HERITAGE BLEND
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    slug: string;
    aspect?: '4/3' | '16/9' | '1/1';
    customClass?: string;
  }>(),
  {
    aspect: '4/3',
    customClass: '',
  }
);

const aspectClass = computed(() => {
  if (props.aspect === '16/9') return 'aspect-video';
  if (props.aspect === '1/1') return 'aspect-square';
  return 'aspect-[4/3]';
});
</script>
