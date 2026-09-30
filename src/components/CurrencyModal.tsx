import React from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';
import { X, Check, Globe } from 'lucide-react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#181310] border border-[#33271F] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#2B211A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-stone-100">Select Currency</h3>
              <p className="text-xs text-stone-400">Prices convert automatically for regional and diaspora orders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#251D17] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const item = CURRENCIES[code];
            const isSelected = selectedCurrency === code;
            return (
              <button
                key={code}
                onClick={() => {
                  onSelectCurrency(code);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                    : 'bg-[#1F1915] border-[#2C221B] text-stone-300 hover:bg-[#28201B] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#140F0D] border border-[#3A2D24] flex items-center justify-center font-mono font-bold text-amber-400 text-sm">
                    {item.symbol}
                  </span>
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      <span>{item.label}</span>
                      {code === 'NGN' && (
                        <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-700/40">
                          Base
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {code === 'NGN' ? 'Primary Domestic Currency' : `~1 ${code} = ₦${item.rateToNgn.toLocaleString()}`}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-[#2B211A] text-center">
          <p className="text-[11px] text-stone-500">
            Orders placed via WhatsApp will include both your selected currency estimate and the official NGN conversion.
          </p>
        </div>
      </div>
    </div>
  );
};
