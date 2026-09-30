<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
    <!-- Header -->
    <div class="space-y-3 text-center">
      <span class="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
        Transparency & Trust
      </span>
      <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
        Food Safety, Allergen Notice & Privacy Policy
      </h1>
      <p class="text-xs text-stone-400">
        Akinnike Ols Pantry & Apothecary · Operating from Southwest Nigeria
      </p>
    </div>

    <div class="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
      <!-- Section 1 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <ShieldCheck class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>1. Artisanal Food Safety & Sourcing Integrity</h2>
        </div>
        <p>
          Akinnike Ols Pantry & Apothecary operates under strict hygienic artisanal standards. All raw botanicals, sun-dried proteins (beef and chicken), seeds, pods, and river crayfish undergo meticulous sorting, hand-cleaning, sediment washing, and solar moisture control prior to cool stone-milling.
        </p>
        <p>
          We do not use artificial colorants, synthetic sulfur bleaches, chemical preservatives, or industrial anti-caking powders in any blend.
        </p>
      </section>

      <!-- Section 2: Allergen Advisory Notice -->
      <section class="p-6 rounded-2xl bg-[#1D1410] border border-amber-800/40 space-y-3">
        <div class="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
          <AlertTriangle class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>2. Critical Allergen Advisory Notice</h2>
        </div>
        <p class="text-stone-300">
          Please review the following ingredient allergen declarations carefully before consumption:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-stone-400 text-xs">
          <li>
            <strong class="text-stone-200">Groundnut / Peanut Allergens:</strong> Our <em class="text-amber-300">Suya Blend (Artisan Yaji)</em> contains double-roasted groundnut cake (kuli-kuli). It is strictly not suitable for individuals with peanut or tree nut allergies.
          </li>
          <li>
            <strong class="text-stone-200">Crustacean Shellfish & Seafood:</strong> Our <em class="text-amber-300">Signature Concoction Blend</em> and <em class="text-amber-300">Native Soup Blend</em> contain sun-dried coastal crayfish and smoked fish flakes.
          </li>
          <li>
            <strong class="text-stone-200">Fermented Legumes:</strong> Blends containing <em>Iru (fermented locust beans)</em> are processed from natural African locust tree seeds.
          </li>
        </ul>
      </section>

      <!-- Section 3 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <Lock class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>3. Privacy & Multichannel Order Information</h2>
        </div>
        <p>
          When you initiate an order through our website, WhatsApp concierge (<span class="font-mono text-stone-200">07051377659</span>), or our automated webhook API (<span class="font-mono text-stone-200">nodus.com/api/webhooks</span>), we collect only the necessary contact details required to fulfill delivery and sync with our backend CRM:
        </p>
        <ul class="list-disc pl-5 space-y-1 text-stone-400 text-xs">
          <li>Customer name, phone number, and delivery street coordinates.</li>
          <li>Itemized product variation preferences, heat level, and grind choices.</li>
          <li>Courier tracking and dispatch timestamps.</li>
        </ul>
        <p>
          We never sell, rent, or distribute personal customer records to third-party telemarketers or external advertisers.
        </p>
      </section>

      <!-- Section 4 -->
      <section class="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
          <RefreshCw class="w-5 h-5 text-amber-500 shrink-0" />
          <h2>4. Freshness Guarantee & Replacement Policy</h2>
        </div>
        <p>
          If any pantry jar or aromalock pouch arrives with a compromised vacuum seal, or if you are dissatisfied with the aroma profile of your small-batch blend, notify our WhatsApp concierge within 48 hours of delivery. We will immediately arrange a replacement jar or store credit.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, AlertTriangle, Lock, RefreshCw } from 'lucide-vue-next';
</script>
