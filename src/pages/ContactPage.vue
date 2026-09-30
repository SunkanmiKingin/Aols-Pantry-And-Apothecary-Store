<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
    <!-- Header -->
    <div class="text-center space-y-3 max-w-2xl mx-auto">
      <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
        Concierge & Support
      </span>
      <h1 class="font-serif text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
        Connect with the Atelier
      </h1>
      <p class="text-sm text-stone-300 font-light">
        Have a question about ingredient sourcing, private catering blends, or delivery to your state? Our multichannel concierge is available to assist.
      </p>
    </div>

    <!-- Contact Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="p-6 rounded-2xl bg-gradient-to-br from-[#12241A] to-[#101913] border border-emerald-600/40 hover:border-emerald-500 transition-all text-center space-y-3 group shadow-lg"
      >
        <div class="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
          <MessageCircle class="w-6 h-6 fill-current" />
        </div>
        <h3 class="font-serif text-lg font-bold text-emerald-200">Instant WhatsApp Concierge</h3>
        <p class="text-xs text-stone-300">Fastest channel for orders and instant delivery estimates.</p>
        <p class="text-xs font-mono font-bold text-emerald-400">{{ config?.channels?.whatsapp?.displayNumber || '+234 705 137 7659' }}</p>
      </a>

      <div class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] text-center space-y-3">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <MapPin class="w-6 h-6" />
        </div>
        <h3 class="font-serif text-lg font-bold text-stone-100">Southwest Logistics Hub</h3>
        <p class="text-xs text-stone-400">Primary dispatch warehouses in Lagos and Ibadan, Nigeria.</p>
        <p class="text-xs font-mono text-amber-400">Lagos & Ibadan 24-48h</p>
      </div>

      <div class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] text-center space-y-3">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <Mail class="w-6 h-6" />
        </div>
        <h3 class="font-serif text-lg font-bold text-stone-100">Direct Inquiries</h3>
        <p class="text-xs text-stone-400">Wholesale distribution, diaspora export, and partnerships.</p>
        <p class="text-xs font-mono text-amber-400">{{ config.brand.email }}</p>
      </div>
    </div>

    <!-- Inquiry Form -->
    <div class="bg-[#17120E] border border-[#2C2119] rounded-3xl p-8 sm:p-12">
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center space-y-2">
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
            Send an Atelier Inquiry
          </h2>
          <p class="text-xs text-stone-400">
            Inquiries are transmitted directly to our backend orchestration API at <span class="font-mono text-amber-400">nodus.com/api/webhooks</span>.
          </p>
        </div>

        <div
          v-if="feedback"
          class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2"
        >
          <CheckCircle2 class="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{{ feedback }}</span>
        </div>

        <form @submit.prevent="handleSubmitInquiry" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-stone-400 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                v-model="name"
                placeholder="e.g. Bukola Akinnike"
                class="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label class="block text-stone-400 mb-1">WhatsApp / Phone Number *</label>
              <input
                type="tel"
                required
                v-model="phone"
                placeholder="e.g. 07051377659"
                class="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-stone-400 mb-1">Email Address (Optional)</label>
              <input
                type="email"
                v-model="email"
                placeholder="e.g. hello@example.com"
                class="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label class="block text-stone-400 mb-1">Subject of Inquiry</label>
              <select
                v-model="subject"
                class="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Product Recommendation">Product Recommendation & Flavour Advice</option>
                <option value="Private Chef / Catering Batch">Private Chef & Event Catering Batch (1kg - 10kg)</option>
                <option value="Southwest Delivery Question">Southwest Nigeria Express Delivery Question</option>
                <option value="Diaspora Export Packaging">UK / US / Diaspora International Export Order</option>
                <option value="Wholesale Distribution">Wholesale & Specialty Retail Partnership</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-stone-400 mb-1">Your Message or Custom Batch Specs *</label>
            <textarea
              required
              rows="4"
              v-model="message"
              placeholder="Tell us about your requirements, catering quantities, or any custom spice ratio needs..."
              class="w-full bg-[#130E0C] border border-[#2A1F18] rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send class="w-4 h-4" />
            <span>{{ isSubmitting ? 'Transmitting to Webhook API...' : 'Dispatch Inquiry to Backend Orchestrator' }}</span>
          </button>
        </form>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div class="space-y-6">
      <h3 class="font-serif text-2xl font-bold text-stone-100 text-center">
        Frequently Answered Questions
      </h3>

      <div class="space-y-3 max-w-3xl mx-auto">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="rounded-2xl bg-[#17120E] border border-[#2A1F18] overflow-hidden transition-colors"
        >
          <button
            @click="openFaq = openFaq === index ? null : index"
            class="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-stone-200 hover:text-amber-300 cursor-pointer"
          >
            <span>{{ faq.q }}</span>
            <ChevronUp v-if="openFaq === index" class="w-4 h-4 text-amber-500" />
            <ChevronDown v-else class="w-4 h-4 text-stone-500" />
          </button>
          <div
            v-if="openFaq === index"
            class="px-4 pb-4 pt-1 text-xs text-stone-400 leading-relaxed border-t border-[#241A14]"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePantryStore } from '../stores/pantry';
import { dispatchMultichannelWebhook } from '../utils/webhook';
import { sanitizePhoneNumberForWhatsApp } from '../utils/whatsapp';
import { MessageCircle, MapPin, Mail, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-vue-next';

const store = usePantryStore();
const { config } = store;

const name = ref('');
const phone = ref('');
const email = ref('');
const subject = ref('Product Recommendation');
const message = ref('');
const isSubmitting = ref(false);
const feedback = ref<string | null>(null);
const openFaq = ref<number | null>(0);

const whatsAppUrl = computed(() => {
  const cfg = config.value;
  const clean = sanitizePhoneNumberForWhatsApp(
    cfg?.channels?.whatsapp?.number || '07051377659',
    cfg?.channels?.whatsapp?.countryCode || '234'
  );
  return `https://wa.me/${clean}`;
});

const faqs = [
  {
    q: 'How fast is delivery within Southwest Nigeria?',
    a: 'We operate primary dispatch hubs in Lagos and Ibadan. Most orders within Lagos, Ibadan, Ogun, and Osun are delivered within 24 to 48 hours via express motorcycle or dedicated interstate courier.'
  },
  {
    q: 'Do you ship to Diaspora kitchens in the UK, US, and Canada?',
    a: 'Yes! We prepare certified, hermetically vacuum-sealed export packs that comply with international agricultural inspection guidelines. Dispatched via DHL Express within 4 to 7 business days.'
  },
  {
    q: 'Are there any artificial preservatives or MSG seasoning cubes in your blends?',
    a: 'Never. Every ounce of umami is derived naturally from pure fermented locust beans (iru crystals), sun-dried coastal crayfish, slow-cured beef, and whole botanical spices. Zero synthetic fillers.'
  },
  {
    q: 'Can I order custom spice heat levels or special coarse/fine grinds?',
    a: 'Absolutely. Because we mill our blends in small batches, you can specify your heat preference (mild, traditional, fiery) or grind style (fine stone-ground silk vs coarse mortar crush) on WhatsApp or website order notes.'
  },
  {
    q: 'Can I order 1kg+ bulk packs for catering or restaurants?',
    a: 'Yes, we provide 1kg Feast and Catering Packs for our Flavoured Beef, Chicken, and signature blends, as well as 5kg catering tubs upon direct consultation.'
  }
];

const handleSubmitInquiry = async () => {
  if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) return;

  isSubmitting.value = true;
  feedback.value = null;

  const inquiryRecord: any = {
    id: 'inq_' + Date.now(),
    orderNumber: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
    sessionRef: 'INQ-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    date: new Date().toISOString(),
    customer: {
      customerName: name.value,
      phone: phone.value,
      email: email.value || undefined,
      address: 'Online Inquiry / Atelier Consultation',
      city: 'Southwest / Nigeria',
      stateOrRegion: 'Nigeria',
      country: 'Nigeria',
      deliveryZone: 'southwest',
      notes: `Subject: ${subject.value} | Message: ${message.value}`,
      preferredChannel: 'web_storefront',
    },
    items: [],
    subtotalNgn: 0,
    shippingEstimateRange: 'N/A',
    currency: 'NGN',
    status: 'new',
    channel: 'web_storefront',
    webhookDispatched: false,
  };

  try {
    await dispatchMultichannelWebhook('inquiry.submitted', inquiryRecord);
  } catch (e) {
    console.warn('Inquiry dispatch notice:', e);
  }

  isSubmitting.value = false;
  feedback.value = `Thank you ${name.value}! Your inquiry has been dispatched to our backend API. You can also chat directly on WhatsApp for an immediate response.`;

  name.value = '';
  phone.value = '';
  email.value = '';
  message.value = '';
};
</script>
