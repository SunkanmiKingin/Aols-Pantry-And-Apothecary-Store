<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
    <!-- Header -->
    <div class="space-y-3 text-center">
      <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
        Commercial Terms
      </span>
      <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
        Terms of Service, Dispatch & Fulfillment
      </h1>
      <p class="text-xs text-stone-400">
        Akinnike Ols Pantry & Apothecary · Operating from Southwest Nigeria
      </p>
    </div>

    <div class="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
      <!-- Section 1 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <Clock class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>1. Order Initiation & Channel Processing</h2>
        </div>
        <p>
          Orders placed via our website direct checkout, WhatsApp concierge (<span class="font-mono text-stone-200">07051377659</span>), or our automated backend webhook API (<span class="font-mono text-stone-200">nodus.com/api/webhooks</span>) represent a formal purchase request.
        </p>
        <p>
          Because we blend in controlled artisanal batches, our concierge confirms current batch availability, grind preference, and dispatch queue before releasing items for shipment.
        </p>
      </section>

      <!-- Section 2 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <Truck class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>2. Dispatch Zones & Negotiable Shipping Ranges</h2>
        </div>
        <p class="text-stone-300">
          Due to variable doorstep mileage across Nigerian states, shipping fees are estimated as negotiable ranges:
        </p>
        <ul class="list-disc pl-5 space-y-2 text-stone-400 text-xs">
          <li>
            <strong class="text-stone-200">Southwest Nigeria Primary Hub:</strong> Encompasses Lagos, Ibadan, Ogun, Osun, Ondo, and Ekiti. Delivery typically takes 24 to 48 business hours (Estimated range: <span class="font-mono text-amber-400">₦2,000 – ₦3,500</span>).
          </li>
          <li>
            <strong class="text-stone-200">Nationwide Interstate Nigeria:</strong> Covers Abuja FCT, Port Harcourt, Kano, Kaduna, Enugu, and all states. Delivered within 2 to 4 business days via reliable interstate logistics (Estimated range: <span class="font-mono text-amber-400">₦4,000 – ₦7,500</span>).
          </li>
          <li>
            <strong class="text-stone-200">African Continental & Diaspora International:</strong> Prepared in certified tamper-evident, hermetically vacuum-sealed export pouches. Dispatched via DHL / FedEx Express within 4 to 7 business days (Estimated range: <span class="font-mono text-amber-400">₦25,000 – ₦45,000</span>). Recipient is responsible for any applicable local customs duty or import tax.
          </li>
        </ul>
      </section>

      <!-- Section 3 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <CreditCard class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>3. Multi-Currency Settlement</h2>
        </div>
        <p>
          Our baseline accounting currency is the Nigerian Naira (₦ NGN). For the convenience of our regional and international diaspora patrons, price estimates can be viewed in USD ($), GBP (£), EUR (€), GHS (GH₵), KES (KSh), and ZAR (R).
        </p>
        <p>
          Domestic payments are settled via verified Nigerian direct bank transfer or online payment links provided by our concierge. For diaspora clients, international wire or card links are provided upon order confirmation.
        </p>
      </section>

      <!-- Section 4 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <Globe class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>4. Private Chef & Bulk Catering Batches</h2>
        </div>
        <p>
          Custom spice proportions, 1kg+ catering bags, salt-free variations, and private chef food-service tubs are subject to a 3-to-5-day compounding lead time. Contact our concierge directly to finalize formulations.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, Truck, CreditCard, Globe } from 'lucide-vue-next';
</script>
