<template>
  <aside
    aria-label="WhatsApp Concierge"
    class="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
  >
    <div class="hidden md:block bg-[#181310]/95 backdrop-blur-md border border-[#33261D] text-stone-200 text-xs py-1.5 px-3 rounded-xl shadow-xl transition-all opacity-0 group-hover:opacity-100 pointer-events-none">
      <p class="font-semibold text-amber-400">Order via WhatsApp</p>
      <p class="text-[10px] text-stone-400">Instant response · {{ config?.channels?.whatsapp?.number || '07051377659' }}</p>
    </div>

    <a
      :href="whatsAppUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      class="relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-neutral-950 shadow-xl shadow-emerald-950/60 transition-transform hover:scale-105 active:scale-95"
    >
      <span class="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
      <MessageCircle class="w-6 h-6 fill-current relative z-10" />
    </a>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { MessageCircle } from 'lucide-vue-next';
import { sanitizePhoneNumberForWhatsApp } from '../utils/whatsapp';

const store = usePantryStore();
const { config } = store;

const whatsAppUrl = computed(() => {
  const cfg = config.value;
  const phone = sanitizePhoneNumberForWhatsApp(
    cfg?.channels?.whatsapp?.number || '07051377659',
    cfg?.channels?.whatsapp?.countryCode || '234'
  );
  return `https://wa.me/${phone}?text=${encodeURIComponent(cfg?.channels?.whatsapp?.welcomePrompt || '')}`;
});
</script>
