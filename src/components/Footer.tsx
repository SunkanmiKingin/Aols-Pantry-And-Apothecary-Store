import React from 'react';
import { MessageCircle, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  whatsappNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, whatsappNumber }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0B0A] border-t border-[#241D17] text-[#A69B90] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#211A15]">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                Akinnike Ols
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-sans mt-0.5">
                Pantry & Apothecary
              </p>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              A premium homemade dry pantry and apothecary store offering carefully sourced, prepared and blended ingredients for the modern home. From signature Nigerian spice and soup blends to dried herbs, fruits, vegetables, proteins, grains and botanical teas.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/234${whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-700/40 px-3 py-1.5 rounded-lg hover:bg-emerald-900/40 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Dedicated Landing Pages */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Signature Landing Pages
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('/landing/concoction-blend')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Concoction Blend
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/landing/flavoured-beef')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Flavoured Shredded & Chunked Beef
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/landing/pepper-soup-blend')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Pepper Soup Blend
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/landing/suya-blend')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Suya Blend (Artisan Yaji)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/landing/ginger-botanical-tea')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Ginger & Botanical Tea
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Company */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              The Pantry
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('/')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  The Atelier (Home)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Sourcing & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Food Safety & Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/terms')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Terms of Delivery & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Logistics & Locations */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-200">
              Dispatch & Logistics
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Primary Hub: Southwest Nigeria (Lagos & Ibadan express courier)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+234 705 137 7659</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>orders@akinnikeols.com</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleNav('/admin')}
                  className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-amber-400 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management Console</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Akinnike Ols Pantry & Apothecary. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('/privacy')} className="hover:text-stone-300">
              Privacy
            </button>
            <span>·</span>
            <button onClick={() => handleNav('/terms')} className="hover:text-stone-300">
              Terms
            </button>
            <span>·</span>
            <button onClick={() => handleNav('/contact')} className="hover:text-stone-300">
              Support
            </button>
            <span>·</span>
            <span className="text-amber-500/80 font-mono text-[11px]">API: nodus.com/api/webhooks</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
