import React from 'react';
import { Leaf, ShieldCheck, HeartHandshake, Sparkles, MessageCircle, MapPin } from 'lucide-react';
import { IntegrationSettings } from '../types';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  settings: IntegrationSettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, settings }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-500 font-mono">
          The Craft & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
          Reclaiming the Ancestral Nigerian Pantry
        </h1>
        <p className="text-base text-stone-300 font-light leading-relaxed">
          Akinnike Ols Pantry & Apothecary was born from a desire to bring the deep, medicinal complexity of traditional Nigerian cooking into the pace of contemporary life—with absolute purity and uncompromising craft.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#17120E] border border-[#2E2219] rounded-3xl p-8 sm:p-12">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Heritage Sourcing
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
            Ingredients sourced with reverence, not shortcuts.
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            In modern commercial food production, spices are frequently diluted with wheat fillers, artificial monosodium glutamate (MSG) cubes, and artificial colors to mimic authentic richness.
          </p>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            At Akinnike Ols, we do the tedious work: we source whole iru crystals from trusted fermented locust bean producers in Oyo and Osun; we roast real ehuru and crack uda pods by hand; we clean and sun-dry river crayfish with zero sand grit; and we cure prime grass-fed beef with natural herbs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#1C1612] border border-[#33261C] space-y-4 text-xs text-stone-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-200">1. Solar Dehydration</h4>
              <p className="text-stone-400 mt-0.5">
                Gentle drying under controlled solar airflow preserves volatile oils, natural enzymes, and therapeutic scents.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-200">2. Cool Stone-Milling</h4>
              <p className="text-stone-400 mt-0.5">
                Slow traditional stone friction grinds whole spices without scorching the aromatic fats and resins.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-stone-200">3. Aromalock Packaging</h4>
              <p className="text-stone-400 mt-0.5">
                Amber apothecary jars and hermetic foil pouches shield our blends from moisture and UV oxidation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Southwest Network */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-stone-100 text-center">
          Our Southwest Roots & Global Reach
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
            <MapPin className="w-5 h-5 text-amber-500" />
            <h4 className="font-serif text-lg font-bold text-stone-200">Southwest Nigeria</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Our central blending atelier operates from Oyo & Lagos, providing same-day packing and 24-48h express delivery across Lagos, Ibadan, Ogun, Osun, Ondo, and Ekiti.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
            <HeartHandshake className="w-5 h-5 text-emerald-500" />
            <h4 className="font-serif text-lg font-bold text-stone-200">Farmer Partnerships</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We contract directly with small-holder herb collectors, locust bean processors, and organic ginger farmers to ensure fair living wages and consistent seasonal harvests.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#17120E] border border-[#2B2018] space-y-3">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h4 className="font-serif text-lg font-bold text-stone-200">Diaspora Ready</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Specially vacuum-sealed for travel and export compliance with express DHL/courier freight to diaspora households in the UK, Europe, US, and Canada.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center p-8 rounded-3xl bg-[#1D1612] border border-[#3A2C21] space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-100">
          Ready to experience the true aroma of heritage cooking?
        </h3>
        <p className="text-xs text-stone-400 max-w-md mx-auto">
          Explore our signature concoction and pepper soup blends, or chat directly with our concierge on WhatsApp.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Explore The Pantry
          </button>
          <a
            href={`https://wa.me/234${settings.whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp: {settings.whatsappNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
