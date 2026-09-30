import React from 'react';
import { Truck, CreditCard, Clock, Globe } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
          Commercial Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
          Terms of Service, Dispatch & Fulfillment
        </h1>
        <p className="text-xs text-stone-400">
          Akinnike Ols Pantry & Apothecary · Operating from Southwest Nigeria
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
        {/* Section 1: Ordering & Order Confirmation */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>1. Order Initiation & Confirmation</h2>
          </div>
          <p>
            Orders placed via our website direct checkout, WhatsApp concierge (<span className="font-mono text-stone-200">07051377659</span>), or our automated backend webhook API (<span className="font-mono text-stone-200">nodus.com/api/webhooks</span>) represent a formal purchase request.
          </p>
          <p>
            Because we blend in controlled artisanal batches, our concierge confirms current batch availability, grind preference, and dispatch queue before releasing items for shipment.
          </p>
        </section>

        {/* Section 2: Delivery Zones & Timelines */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Truck className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>2. Dispatch Zones & Shipping Schedules</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-stone-400 text-xs">
            <li>
              <strong className="text-stone-200">Zone 1 — Southwest Nigeria Primary Hub:</strong> Encompasses Lagos, Ibadan, Ogun, Osun, Ondo, and Ekiti. Delivery typically takes 24 to 48 business hours following small-batch packaging.
            </li>
            <li>
              <strong className="text-stone-200">Zone 2 — Nationwide Interstate Nigeria:</strong> Covers Abuja FCT, Port Harcourt, Kano, Kaduna, Enugu, Calabar, and other states. Delivered within 2 to 4 business days via reliable interstate courier logistics.
            </li>
            <li>
              <strong className="text-stone-200">Zone 3 — African Continental & Diaspora International:</strong> Prepared in certified tamper-evident, hermetically vacuum-sealed export pouches. Dispatched via international tracked courier (DHL / FedEx Express) within 4 to 7 business days. Recipient is responsible for any applicable local customs duty or import tax.
            </li>
          </ul>
        </section>

        {/* Section 3: Pricing & Multi-Currency Settlement */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <CreditCard className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>3. Currency & Payment Methods</h2>
          </div>
          <p>
            Our baseline accounting currency is the Nigerian Naira (₦ NGN). For the convenience of our regional and international diaspora patrons, price estimates can be viewed in USD ($), GBP (£), EUR (€), GHS (GH₵), KES (KSh), and ZAR (R).
          </p>
          <p>
            Domestic payments are settled via verified Nigerian direct bank transfer or online payment links provided by our concierge. For diaspora clients, international payment links (credit/debit cards or wire) will be provided upon order confirmation.
          </p>
        </section>

        {/* Section 4: Wholesale & Custom Blending */}
        <section className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Globe className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>4. Custom Blending & Catering Batches</h2>
          </div>
          <p>
            Custom spice proportions, salt-free variations, private catering 5kg/10kg food-service tubs, and bespoke wedding souvenir apothecary jars are subject to a 5-day compounding lead time. Contact our concierge directly to finalize formulations.
          </p>
        </section>
      </div>
    </div>
  );
};
