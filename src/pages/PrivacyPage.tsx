import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, RefreshCw } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
          Transparency & Trust
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
          Food Safety, Allergen Notice & Privacy Policy
        </h1>
        <p className="text-xs text-stone-400">
          Last updated: October 2026 · Akinnike Ols Pantry & Apothecary
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
        {/* Section 1: Food Safety & Preparation */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>1. Artisanal Food Safety & Sourcing Integrity</h2>
          </div>
          <p>
            Akinnike Ols Pantry & Apothecary operates under strict hygienic standards. All raw botanical herbs, dried proteins (beef and chicken), seeds, pods, and river crayfish undergo meticulous sorting, hand-cleaning, sand sediment removal, and solar moisture control prior to cool stone-milling.
          </p>
          <p>
            We do not use artificial colorants, synthetic sulfur bleaches, chemical preservatives, or industrial anti-caking powders in any blend.
          </p>
        </section>

        {/* Section 2: Allergen Advisory Notice */}
        <section className="p-6 rounded-2xl bg-[#1D1410] border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>2. Critical Allergen Advisory Notice</h2>
          </div>
          <p className="text-stone-300">
            Please review the following ingredient allergen declarations carefully before consumption:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-400 text-xs">
            <li>
              <strong className="text-stone-200">Groundnut / Peanut Allergens:</strong> Our <em className="text-amber-300">Suya Blend (Artisan Yaji)</em> contains double-roasted groundnut cake (kuli-kuli). It is strictly not suitable for individuals with peanut or tree nut allergies.
            </li>
            <li>
              <strong className="text-stone-200">Crustacean Shellfish & Seafood:</strong> Our <em className="text-amber-300">Signature Concoction Blend</em> and <em className="text-amber-300">Native Soup Blend</em> contain sun-dried coastal crayfish and smoked fish flakes.
            </li>
            <li>
              <strong className="text-stone-200">Fermented Legumes:</strong> Blends containing <em>Iru (fermented locust beans)</em> are processed from natural African locust tree seeds.
            </li>
          </ul>
        </section>

        {/* Section 3: Data Privacy & Order Information */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Lock className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>3. Privacy & Customer Information Handling</h2>
          </div>
          <p>
            When you initiate an order through our website, WhatsApp concierge (<span className="font-mono text-stone-200">07051377659</span>), or our automated webhook API (<span className="font-mono text-stone-200">nodus.com/api/webhooks</span>), we collect only the necessary contact details required to fulfill delivery:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-400 text-xs">
            <li>Customer name, phone number, and delivery address.</li>
            <li>Itemized product variation preferences, heat level, and grind choices.</li>
            <li>Courier tracking and dispatch timestamps.</li>
          </ul>
          <p>
            We will never sell, rent, or distribute your personal contact information to third-party telemarketers or external advertisers.
          </p>
        </section>

        {/* Section 4: Freshness Guarantee & Replacement Policy */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <RefreshCw className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>4. Freshness Guarantee & Replacement Policy</h2>
          </div>
          <p>
            If any pantry jar or aromalock pouch arrives with a compromised factory vacuum seal, or if you are dissatisfied with the aroma profile of your small-batch blend, notify our WhatsApp concierge within 48 hours of delivery with a photo of the batch number. We will immediately arrange a replacement jar or store credit.
          </p>
        </section>
      </div>
    </div>
  );
};
