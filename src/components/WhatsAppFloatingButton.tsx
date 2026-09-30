import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  whatsappNumber: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ whatsappNumber }) => {
  const cleanPhone = '234' + whatsappNumber.replace(/\D/g, '').replace(/^0/, '');
  const chatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Akinnike Ols Pantry! I am browsing your apothecary and would like to ask a question or place an order.'
  )}`;

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
    >
      <div className="hidden md:block bg-[#181310]/95 backdrop-blur-md border border-[#33261D] text-stone-200 text-xs py-1.5 px-3 rounded-xl shadow-xl transition-all opacity-0 group-hover:opacity-100 pointer-events-none">
        <p className="font-semibold text-amber-400">Order via WhatsApp</p>
        <p className="text-[10px] text-stone-400">Instant response · 07051377659</p>
      </div>

      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-neutral-950 shadow-xl shadow-emerald-950/60 transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
        <MessageCircle className="w-6 h-6 fill-current relative z-10" />
      </a>
    </aside>
  );
};
