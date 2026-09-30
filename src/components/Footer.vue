<template>
  <footer class="bg-[#0D0B0A] border-t border-[#241D17] text-[#A69B90] pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#211A15]">
        <!-- Brand & Mission Column -->
        <div class="lg:col-span-2 space-y-4">
          <div>
            <span class="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
              {{ config.brand.name }}
            </span>
            <p class="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-sans mt-0.5">
              Pantry & Apothecary · Nigeria
            </p>
          </div>

          <p class="text-sm leading-relaxed text-stone-400 max-w-sm">
            {{ config.brand.description }}
          </p>

          <!-- Channels quick links -->
          <div class="pt-2 flex flex-wrap items-center gap-2">
            <a
              v-if="config.channels.whatsapp.enabled"
              :href="whatsAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-700/40 px-3 py-1.5 rounded-lg hover:bg-emerald-900/40 transition-colors"
            >
              <MessageCircle class="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: {{ config.channels.whatsapp.number }}</span>
            </a>

            <a
              v-if="config.channels.telegram.enabled"
              :href="config.channels.telegram.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-950/40 border border-sky-700/40 px-3 py-1.5 rounded-lg hover:bg-sky-900/40 transition-colors"
            >
              <Send class="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            <a
              v-if="config.channels.instagram.enabled"
              :href="config.channels.instagram.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 bg-pink-950/40 border border-pink-700/40 px-3 py-1.5 rounded-lg hover:bg-pink-900/40 transition-colors"
            >
              <Instagram class="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <!-- Dedicated Landing Pages Column -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-wider font-semibold text-stone-200 font-mono">
            Featured Landing Pages
          </h4>
          <ul class="space-y-2 text-xs text-stone-400">
            <li>
              <router-link to="/landing/concoction-blend" class="hover:text-amber-400 transition-colors">
                Concoction Blend
              </router-link>
            </li>
            <li>
              <router-link to="/landing/flavoured-beef" class="hover:text-amber-400 transition-colors">
                Flavoured Shredded & Chunked Beef
              </router-link>
            </li>
            <li>
              <router-link to="/landing/pepper-soup-blend" class="hover:text-amber-400 transition-colors">
                Pepper Soup Blend
              </router-link>
            </li>
            <li>
              <router-link to="/landing/suya-blend" class="hover:text-amber-400 transition-colors">
                Suya Blend (Artisan Yaji)
              </router-link>
            </li>
            <li>
              <router-link to="/landing/ginger-botanical-tea" class="hover:text-amber-400 transition-colors">
                Ginger & Botanical Tea
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Core Navigation -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-wider font-semibold text-stone-200 font-mono">
            The Atelier
          </h4>
          <ul class="space-y-2 text-xs text-stone-400">
            <li>
              <router-link to="/" class="hover:text-amber-400 transition-colors">
                The Atelier (Home)
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="hover:text-amber-400 transition-colors">
                Sourcing & Philosophy
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-amber-400 transition-colors">
                Contact & Custom Batches
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="hover:text-amber-400 transition-colors">
                Food Safety & Privacy Policy
              </router-link>
            </li>
            <li>
              <router-link to="/terms" class="hover:text-amber-400 transition-colors">
                Terms of Delivery & Dispatch
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Logistics Hub & Destination -->
        <div class="space-y-3">
          <h4 class="text-xs uppercase tracking-wider font-semibold text-stone-200 font-mono">
            Logistics & API Hub
          </h4>
          <div class="space-y-2 text-xs text-stone-400">
            <p class="flex items-start gap-2">
              <MapPin class="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{{ config.brand.address }}</span>
            </p>
            <p class="flex items-center gap-2">
              <Phone class="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{{ config?.channels?.whatsapp?.displayNumber || '+234 705 137 7659' }}</span>
            </p>
            <p class="flex items-center gap-2">
              <Mail class="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{{ config.brand.email }}</span>
            </p>
            <div class="pt-2">
              <router-link
                to="/admin"
                class="inline-flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-amber-400 transition-colors"
              >
                <ShieldCheck class="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Management Console</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© {{ new Date().getFullYear() }} {{ config.brand.name }}. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <router-link to="/privacy" class="hover:text-stone-300">Privacy & Allergens</router-link>
          <span>·</span>
          <router-link to="/terms" class="hover:text-stone-300">Terms of Service</router-link>
          <span>·</span>
          <router-link to="/contact" class="hover:text-stone-300">Support</router-link>
          <span>·</span>
          <span class="text-amber-500/80 font-mono text-[11px]">API: {{ config.backendApi.webhookUrl }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { MessageCircle, Send, Instagram, MapPin, Phone, Mail, ShieldCheck } from 'lucide-vue-next';
import { sanitizePhoneNumberForWhatsApp } from '../utils/whatsapp';

const store = usePantryStore();
const { config } = store;

const whatsAppUrl = computed(() => {
  const cfg = config.value;
  const phone = sanitizePhoneNumberForWhatsApp(
    cfg?.channels?.whatsapp?.number || '07051377659',
    cfg?.channels?.whatsapp?.countryCode || '234'
  );
  return `https://wa.me/${phone}`;
});
</script>
