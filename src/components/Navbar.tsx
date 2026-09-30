import React, { useState } from 'react';
import { CurrencyCode, CartItem } from '../types';
import { MessageCircle, ShoppingBag, Globe, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  onOpenCurrencyModal: () => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  currency,
  onOpenCurrencyModal,
  cartItems,
  onOpenCart,
  whatsappNumber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'The Atelier', path: '/' },
    { label: 'Concoction Blend', path: '/landing/concoction-blend' },
    { label: 'Flavoured Beef', path: '/landing/flavoured-beef' },
    { label: 'Pepper Soup', path: '/landing/pepper-soup-blend' },
    { label: 'Suya Yaji', path: '/landing/suya-blend' },
    { label: 'Our Story', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#12100E]/90 backdrop-blur-md border-b border-[#2B231D]">
      {/* Top Bar Announcement: Southwest primary shipping + Diaspora worldwide */}
      <div className="bg-[#1C1713] text-[#D4C3B3] border-b border-[#2A221C] text-[11px] py-1.5 px-4 text-center tracking-wide">
        <span className="text-amber-500 font-medium">Southwest Nigeria Express Delivery</span> (Lagos & Ibadan 24-48h) · Shipping Nationwide & Diaspora Worldwide · Direct WhatsApp Ordering
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-amber-400 transition-colors">
            Akinnike Ols
          </span>
          <span className="block text-[10px] tracking-[0.2em] uppercase text-stone-400 font-sans -mt-0.5">
            Pantry & Apothecary
          </span>
        </button>

        {/* Zone 2: Clean 4–6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#C8BFB5]">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors hover:text-white cursor-pointer py-1 relative ${
                  isActive ? 'text-amber-400 font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick('/admin')}
            className="flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors text-xs ml-2 py-1 px-2.5 rounded bg-[#1E1915] border border-[#332A23]"
            title="Manage Products, Orders & Webhooks"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <button
            onClick={onOpenCurrencyModal}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white py-1.5 px-2.5 rounded-lg bg-[#1D1713] border border-[#30261F] transition-colors"
            title="Switch Currency"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono font-medium">{currency}</span>
          </button>

          {/* WhatsApp Direct Concierge */}
          <a
            href={`https://wa.me/234${whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
              'Hello Akinnike Ols Pantry! I would like to inquire about your handcrafted blends and place an order.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#12100E] bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 rounded-lg transition-all shadow-sm shadow-emerald-950/40 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Order</span>
          </a>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-300 hover:text-white rounded-lg bg-[#1D1713] border border-[#30261F] transition-colors focus:outline-none"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg bg-[#1D1713] border border-[#30261F]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181310] border-b border-[#2E241E] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className="block w-full text-left py-2 px-3 rounded text-sm text-[#D7CEBE] hover:bg-[#251E18] hover:text-white font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#2E241E] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('/admin')}
              className="flex items-center gap-2 py-2 px-3 rounded text-xs text-amber-400 bg-[#221A15]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Backend</span>
            </button>
            <a
              href={`https://wa.me/234${whatsappNumber.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                'Hello Akinnike Ols Pantry! I would like to inquire about your handcrafted blends.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-neutral-950 bg-emerald-500 rounded-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Order (07051377659)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
