<template>
  <header class="sticky top-0 z-40 bg-[#12100E]/95 backdrop-blur-md border-b border-[#2B231D]">
    <!-- Top Announcement Strip: Southwest Logistics & Multi-Channel Notice -->
    <div class="bg-[#1C1713] text-[#D4C3B3] border-b border-[#2A221C] text-[11px] py-1.5 px-4 text-center tracking-wide">
      <span class="text-amber-500 font-medium">Southwest Nigeria Express Delivery</span> (Lagos & Ibadan 24-48h) · Shipping Nationwide & Diaspora Worldwide · Direct WhatsApp Ordering
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      <!-- Zone 1: Single text element wordmark -->
      <router-link to="/" class="text-left group focus:outline-none">
        <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-amber-400 transition-colors">
          {{ config.brand.shortName }}
        </span>
        <span class="block text-[10px] tracking-[0.2em] uppercase text-stone-400 font-sans -mt-0.5">
          Pantry & Apothecary
        </span>
      </router-link>

      <!-- Zone 2: 4-6 Clean text navigation links -->
      <nav class="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#C8BFB5]">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="transition-colors hover:text-white py-1 relative"
          active-class="text-amber-400 font-semibold"
        >
          {{ link.label }}
        </router-link>

        <router-link
          to="/admin"
          class="flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors text-xs ml-2 py-1 px-2.5 rounded bg-[#1E1915] border border-[#332A23]"
          title="Manage Products, Orders & Webhooks"
        >
          <ShieldCheck class="w-3.5 h-3.5 text-amber-500" />
          <span>Admin</span>
        </router-link>
      </nav>

      <!-- Zone 3: 1-2 primary actions -->
      <div class="flex items-center gap-3">
        <!-- Currency Switcher Trigger -->
        <button
          @click="store.openCurrencyModal()"
          class="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white py-1.5 px-2.5 rounded-lg bg-[#1D1713] border border-[#30261F] transition-colors cursor-pointer"
          title="Switch Active Currency"
        >
          <Globe class="w-3.5 h-3.5 text-amber-500" />
          <span class="font-mono font-medium">{{ currency }}</span>
        </button>

        <!-- WhatsApp Direct Concierge Button -->
        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#12100E] bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 rounded-lg transition-all shadow-sm shadow-emerald-950/40 whitespace-nowrap cursor-pointer"
        >
          <MessageCircle class="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp Concierge</span>
        </a>

        <!-- Cart Bag Drawer Trigger -->
        <button
          @click="store.openCart()"
          class="relative p-2 text-stone-300 hover:text-white rounded-lg bg-[#1D1713] border border-[#30261F] transition-colors focus:outline-none cursor-pointer"
          aria-label="Open Cart"
        >
          <ShoppingBag class="w-4 h-4 text-amber-400" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-bounce"
          >
            {{ cartCount }}
          </span>
        </button>

        <!-- Mobile menu hamburger toggle -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg bg-[#1D1713] border border-[#30261F]"
          aria-label="Toggle Navigation Menu"
        >
          <X v-if="mobileOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="mobileOpen" class="lg:hidden bg-[#181310] border-b border-[#2E241E] px-4 pt-3 pb-5 space-y-2">
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        @click="mobileOpen = false"
        class="block py-2 px-3 rounded text-sm text-[#D7CEBE] hover:bg-[#251E18] hover:text-white font-medium"
      >
        {{ link.label }}
      </router-link>

      <div class="pt-2 border-t border-[#2E241E] flex flex-col gap-2">
        <router-link
          to="/admin"
          @click="mobileOpen = false"
          class="flex items-center gap-2 py-2 px-3 rounded text-xs text-amber-400 bg-[#221A15]"
        >
          <ShieldCheck class="w-4 h-4" />
          <span>Admin Management Backend</span>
        </router-link>

        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-emerald-500 rounded-lg"
        >
          <MessageCircle class="w-4 h-4 fill-current" />
          <span>Direct WhatsApp Order ({{ config?.channels?.whatsapp?.number || '07051377659' }})</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { Globe, ShoppingBag, MessageCircle, ShieldCheck, Menu, X } from 'lucide-vue-next';
import { sanitizePhoneNumberForWhatsApp } from '../utils/whatsapp';

const store = usePantryStore();
const { config, currency, cartCount } = store;
const mobileOpen = ref(false);

const navLinks = [
  { label: 'The Atelier', path: '/' },
  { label: 'Concoction Blend', path: '/landing/concoction-blend' },
  { label: 'Flavoured Beef', path: '/landing/flavoured-beef' },
  { label: 'Pepper Soup', path: '/landing/pepper-soup-blend' },
  { label: 'Suya Yaji', path: '/landing/suya-blend' },
  { label: 'Our Story', path: '/about' },
  { label: 'Contact & Inquiry', path: '/contact' },
];

const whatsAppUrl = computed(() => {
  const cfg = config.value;
  const phone = sanitizePhoneNumberForWhatsApp(
    cfg?.channels?.whatsapp?.number || '07051377659',
    cfg?.channels?.whatsapp?.countryCode || '234'
  );
  return `https://wa.me/${phone}?text=${encodeURIComponent(cfg?.channels?.whatsapp?.welcomePrompt || '')}`;
});
</script>
