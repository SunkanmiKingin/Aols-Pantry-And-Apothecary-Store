import React from 'react';

interface ProductArtworkProps {
  slug: string;
  className?: string;
  aspect?: '4/3' | '16/9' | '1/1';
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ slug, className = '', aspect = '4/3' }) => {
  const aspectClass = aspect === '16/9' ? 'aspect-video' : aspect === '1/1' ? 'aspect-square' : 'aspect-[4/3]';

  // Dynamic visual styling depending on the product
  if (slug === 'concoction-blend') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1B11] via-[#1F140D] to-[#120C07] border border-[#442817]/60 flex items-center justify-center ${aspectClass} ${className}`}>
        {/* Ambient warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle decorative grain & ring */}
        <div className="absolute w-48 h-48 rounded-full border border-amber-500/10 animate-pulse pointer-events-none" />

        <svg viewBox="0 0 400 300" className="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wooden / Slate Pedestal */}
          <ellipse cx="200" cy="240" rx="140" ry="24" fill="#0C0805" opacity="0.8" />
          <ellipse cx="200" cy="235" rx="130" ry="18" fill="#1C140D" />
          <ellipse cx="200" cy="232" rx="120" ry="14" fill="#2A1E14" />

          {/* Clay Mortar / Ceramic Bowl */}
          <path d="M120 180 Q200 240 280 180 Q290 220 200 230 Q110 220 120 180 Z" fill="#3D2619" />
          <path d="M120 180 Q200 160 280 180 Q200 200 120 180 Z" fill="#26170E" />

          {/* Golden-Amber Concoction Spice Mound */}
          <ellipse cx="200" cy="180" rx="65" ry="16" fill="#C2410C" />
          <ellipse cx="200" cy="178" rx="55" ry="12" fill="#D97706" />
          <ellipse cx="195" cy="175" rx="42" ry="8" fill="#F59E0B" />

          {/* Texture specks: Crayfish & Iru crystals */}
          <circle cx="175" cy="176" r="3" fill="#78350F" />
          <circle cx="215" cy="178" r="2.5" fill="#451A03" />
          <circle cx="190" cy="174" r="2" fill="#FEF3C7" opacity="0.7" />
          <circle cx="225" cy="177" r="2" fill="#991B1B" />
          <circle cx="160" cy="179" r="2.5" fill="#B45309" />

          {/* Amber Glass Apothecary Jar in background */}
          <rect x="225" y="80" width="80" height="110" rx="12" fill="#451A03" fillOpacity="0.85" stroke="#B45309" strokeWidth="2" />
          <rect x="235" y="66" width="60" height="14" rx="4" fill="#78350F" stroke="#B45309" strokeWidth="1" />
          <rect x="245" y="58" width="40" height="8" rx="2" fill="#291409" />
          {/* Jar Label */}
          <rect x="233" y="105" width="64" height="55" rx="4" fill="#F3EFEA" fillOpacity="0.95" />
          <rect x="241" y="115" width="48" height="3" rx="1" fill="#78350F" />
          <rect x="245" y="122" width="40" height="2" rx="1" fill="#92400E" />
          <rect x="249" y="128" width="32" height="2" rx="1" fill="#B45309" />
          <circle cx="265" cy="144" r="6" fill="#D97706" />

          {/* Dried Botanical Scent Leaves and Whole Chilies */}
          <path d="M110 210 Q90 190 80 215 Q100 220 110 210 Z" fill="#365314" opacity="0.9" />
          <path d="M125 220 Q105 205 98 230 Q120 232 125 220 Z" fill="#4D7C0F" opacity="0.9" />
          {/* Dried Red Pepper */}
          <path d="M140 225 C140 225 155 245 175 235 C170 228 150 218 140 225 Z" fill="#DC2626" />
          <path d="M138 223 Q132 215 130 213" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Badge in corner */}
        <div className="absolute bottom-3 left-3 bg-[#17110C]/80 backdrop-blur-md border border-amber-600/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-amber-300">
          CONCOCTION · SMALL BATCH
        </div>
      </div>
    );
  }

  if (slug === 'flavoured-beef') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#271010] via-[#1B0A0A] to-[#100606] border border-[#521E1E]/60 flex items-center justify-center ${aspectClass} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent pointer-events-none" />

        <svg viewBox="0 0 400 300" className="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Raw Slate Serving Board */}
          <path d="M70 210 L330 180 L350 230 L90 260 Z" fill="#1C1917" stroke="#292524" strokeWidth="2" />
          <path d="M70 210 L90 260 L90 266 L70 216 Z" fill="#0C0A09" />

          {/* Craft Foil / Aromalock Pouch in background */}
          <path d="M220 70 L300 60 L310 180 L230 190 Z" fill="#443224" stroke="#78593E" strokeWidth="1.5" />
          <path d="M220 70 L300 60 L298 75 L218 85 Z" fill="#2E2015" />
          {/* Pouch Label */}
          <path d="M235 95 L285 88 L290 150 L240 157 Z" fill="#F5EBE1" opacity="0.92" />
          <rect x="245" y="105" width="30" height="3" fill="#78350F" transform="rotate(-7 245 105)" />
          <rect x="248" y="114" width="24" height="2" fill="#991B1B" transform="rotate(-7 248 114)" />

          {/* Cured Beef Chunks & Shredded Strands Pile */}
          {/* Meaty Chunk 1 */}
          <polygon points="120,205 155,195 165,220 130,230" fill="#5A1A1A" stroke="#3F1212" />
          <polygon points="120,205 130,230 125,235 115,210" fill="#3D1212" />
          {/* Meaty Chunk 2 */}
          <polygon points="160,185 195,178 205,200 170,208" fill="#6E1F1F" stroke="#481515" />
          {/* Meaty Chunk 3 */}
          <polygon points="140,215 180,210 190,235 150,242" fill="#7F1D1D" stroke="#450A0A" />

          {/* Fine Shredded Strands (Crisp flakes) */}
          <path d="M100 220 Q120 215 140 225" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 235 Q135 225 150 240" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M170 215 Q190 205 210 220" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          <path d="M185 228 Q205 220 225 235" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M130 200 Q145 188 160 202" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" />

          {/* Golden Suya Spice Powder dusting over beef */}
          <ellipse cx="160" cy="215" rx="40" ry="12" fill="#D97706" opacity="0.4" />
          <circle cx="145" cy="210" r="1.5" fill="#F59E0B" />
          <circle cx="175" cy="218" r="1.5" fill="#FBBF24" />
          <circle cx="160" cy="205" r="1.5" fill="#EF4444" />
          <circle cx="135" cy="225" r="1.5" fill="#F59E0B" />
          <circle cx="190" cy="215" r="1.5" fill="#EF4444" />

          {/* Roasted Garlic Clove */}
          <ellipse cx="220" cy="235" rx="12" ry="8" fill="#FDF4E3" stroke="#D1B898" strokeWidth="1" />
          <path d="M228 232 Q235 230 236 226" stroke="#8C6F4B" strokeWidth="1.5" />
        </svg>

        <div className="absolute bottom-3 left-3 bg-[#170B0B]/80 backdrop-blur-md border border-red-700/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-red-300">
          SLOW-DEHYDRATED · PRIME BEEF
        </div>
      </div>
    );
  }

  if (slug === 'pepper-soup-blend') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2B170E] via-[#1E100A] to-[#120905] border border-[#522915]/60 flex items-center justify-center ${aspectClass} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-transparent to-transparent pointer-events-none" />

        <svg viewBox="0 0 400 300" className="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ceramic shallow dish */}
          <ellipse cx="200" cy="220" rx="130" ry="32" fill="#1C120C" />
          <ellipse cx="200" cy="215" rx="120" ry="26" fill="#2C1A11" />
          <ellipse cx="200" cy="210" rx="100" ry="20" fill="#3D2417" />

          {/* Steaming therapeutic soup / spice powder */}
          <ellipse cx="200" cy="208" rx="85" ry="15" fill="#B45309" />
          <ellipse cx="200" cy="206" rx="70" ry="11" fill="#C2410C" />

          {/* Whole Ehuru (African Nutmeg) Pods */}
          <ellipse cx="140" cy="210" rx="16" ry="13" fill="#451A03" stroke="#78350F" strokeWidth="1.5" transform="rotate(-15 140 210)" />
          <path d="M132 205 Q142 208 148 214" stroke="#92400E" strokeWidth="1" />

          <ellipse cx="260" cy="212" rx="14" ry="11" fill="#451A03" stroke="#78350F" strokeWidth="1.5" transform="rotate(20 260 212)" />

          {/* Long Uda (Grains of Selim) Pods */}
          <path d="M120 185 Q170 195 210 180 Q190 170 120 185 Z" fill="#1F130B" stroke="#451A03" strokeWidth="1" />
          <circle cx="140" cy="183" r="4" fill="#2D1A0E" />
          <circle cx="165" cy="185" r="4.5" fill="#2D1A0E" />
          <circle cx="190" cy="182" r="4" fill="#2D1A0E" />

          {/* Uziza peppercorns scatter */}
          <circle cx="170" cy="208" r="3" fill="#18181B" />
          <circle cx="185" cy="212" r="2.5" fill="#18181B" />
          <circle cx="215" cy="205" r="3" fill="#18181B" />
          <circle cx="230" cy="210" r="2.5" fill="#18181B" />

          {/* Dried Lemongrass Sprigs */}
          <path d="M210 230 Q250 170 280 150" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M215 225 Q260 180 290 170" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />

          {/* Floating Steam / Therapeutic Aroma Waves */}
          <path d="M180 160 Q175 140 185 120 Q195 100 190 80" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <path d="M205 165 Q215 140 205 115 Q195 90 208 70" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <path d="M230 160 Q225 140 235 120 Q245 100 240 85" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </svg>

        <div className="absolute bottom-3 left-3 bg-[#140C07]/80 backdrop-blur-md border border-orange-700/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-orange-300">
          EHURU & UDA · RESTORATIVE
        </div>
      </div>
    );
  }

  if (slug === 'suya-blend') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D1F0E] via-[#1F150A] to-[#120C05] border border-[#543A18]/60 flex items-center justify-center ${aspectClass} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        <svg viewBox="0 0 400 300" className="w-full h-full max-w-[340px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wooden Board */}
          <ellipse cx="200" cy="225" rx="140" ry="25" fill="#1C140C" />
          <ellipse cx="200" cy="220" rx="130" ry="18" fill="#2C1F13" />

          {/* Glass Shaker Jar */}
          <rect x="230" y="70" width="70" height="130" rx="10" fill="#451A03" fillOpacity="0.75" stroke="#D97706" strokeWidth="2" />
          {/* Perforated Metal Shaker Lid */}
          <rect x="233" y="55" width="64" height="18" rx="4" fill="#78716C" stroke="#A8A29E" strokeWidth="1" />
          <circle cx="245" cy="64" r="2" fill="#292524" />
          <circle cx="255" cy="64" r="2" fill="#292524" />
          <circle cx="265" cy="64" r="2" fill="#292524" />
          <circle cx="275" cy="64" r="2" fill="#292524" />
          <circle cx="285" cy="64" r="2" fill="#292524" />

          {/* Suya Yaji Powder inside jar */}
          <rect x="233" y="95" width="64" height="100" rx="6" fill="#D97706" fillOpacity="0.9" />

          {/* Artisan Label */}
          <rect x="238" y="115" width="54" height="50" rx="3" fill="#FDFBF7" />
          <rect x="245" y="125" width="40" height="3" fill="#78350F" />
          <rect x="248" y="132" width="34" height="2" fill="#B45309" />
          <text x="265" y="152" fill="#991B1B" fontSize="8" fontWeight="bold" textAnchor="middle">YAJI</text>

          {/* Heaped pile of fine golden-red Suya spice on board */}
          <path d="M90 225 Q140 160 190 225 Z" fill="#B45309" />
          <path d="M100 225 Q140 170 180 225 Z" fill="#D97706" />
          <path d="M115 225 Q140 180 165 225 Z" fill="#F59E0B" />

          {/* Roasted Whole Cloves and Peanuts */}
          <ellipse cx="95" cy="225" rx="8" ry="5" fill="#92400E" stroke="#78350F" strokeWidth="1" />
          <ellipse cx="108" cy="230" rx="7" ry="4.5" fill="#78350F" />
          <ellipse cx="185" cy="228" rx="8" ry="5" fill="#92400E" />

          {/* Dry ginger root piece */}
          <path d="M70 215 C65 205 75 195 85 200 C95 205 90 220 80 225 Z" fill="#D4A373" stroke="#A77B50" strokeWidth="1" />
        </svg>

        <div className="absolute bottom-3 left-3 bg-[#140E06]/80 backdrop-blur-md border border-amber-600/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-amber-300">
          ROASTED KULI-KULI · ARTISAN YAJI
        </div>
      </div>
    );
  }

  // Fallback for native soup, chicken, tea, broth
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#241C16] via-[#1A1410] to-[#120D0A] border border-[#3D2E24]/60 flex items-center justify-center ${aspectClass} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-700/10 via-transparent to-transparent pointer-events-none" />
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-950/40 border border-amber-600/30 flex items-center justify-center text-amber-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className="font-serif text-lg text-amber-200 tracking-wide capitalize">{slug.replace('-', ' ')}</p>
        <p className="text-xs text-stone-400 mt-1">Akinnike Ols Artisanal Pantry</p>
      </div>
      <div className="absolute bottom-3 left-3 bg-[#120D0A]/80 backdrop-blur-md border border-stone-700/30 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-stone-300">
        HERITAGE BLEND
      </div>
    </div>
  );
};
