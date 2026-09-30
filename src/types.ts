export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'GHS' | 'KES' | 'ZAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateToNgn: number; // 1 Unit of this currency = X NGN (or NGN as base = 1)
  exchangeRateFromNgn: number; // Multiply NGN price by this to get foreign price
}

export interface ProductVariation {
  id: string;
  name: string; // e.g. "100g Amber Apothecary Glass", "250g Aromalock Craft Pouch", "500g Chef Pantry Tub"
  sizeGrams?: number;
  priceNgn: number;
  inStock: boolean;
  sku: string;
  cutOrGrindOptions?: string[]; // e.g. ["Fine Stone-Ground", "Coarse Mortar Crush"] or ["Shredded Strands", "Chunky Bites"]
  heatLevels?: string[]; // e.g. ["Mild Warmth", "Traditional Heat", "Extra Fiery"]
  flavourNotes?: string[];
}

export type ProductCategory = 
  | 'signature-concoctions' 
  | 'flavoured-proteins' 
  | 'pantry-essentials' 
  | 'botanical-teas';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  advertisedFirst?: boolean;
  landingPageUrl: string;
  badge?: string; // e.g. "Artisan Small Batch", "Sun-Dried & Stone-Ground", "No Preservatives"
  description: string;
  longDescription: string;
  ingredients: string[];
  culinaryUses: string[];
  originAndProcess: string;
  storageInstructions: string;
  accentColor: string; // for rich visual theme
  iconType: 'soup' | 'protein' | 'spice' | 'tea' | 'broth';
  variations: ProductVariation[];
  featuredReviews?: {
    author: string;
    location: string;
    rating: number;
    quote: string;
  }[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  variation: ProductVariation;
  selectedCutOrGrind?: string;
  selectedHeatLevel?: string;
  quantity: number;
}

export interface CustomerOrderData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  stateOrRegion: string;
  country: string;
  deliveryZone: 'southwest' | 'nigeria-wide' | 'diaspora-international';
  notes: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  customer: CustomerOrderData;
  items: CartItem[];
  totalNgn: number;
  currency: CurrencyCode;
  totalInCurrency: number;
  status: 'new' | 'contacted' | 'packed' | 'dispatched' | 'completed';
  channel: 'whatsapp' | 'webhook_api' | 'direct';
  webhookDispatched: boolean;
  webhookResponseStatus?: number;
}

export interface IntegrationSettings {
  whatsappNumber: string; // e.g. "07051377659"
  whatsappCountryCode: string; // "234"
  whatsappConciergeName: string;
  webhookUrl: string; // "https://nodus.com/api/webhooks"
  webhookSecretToken: string;
  enableAutoWebhookDispatch: boolean;
  businessEmail: string;
  businessPhoneDisplay: string;
  physicalLocation: string;
  shippingZones: {
    id: 'southwest' | 'nigeria-wide' | 'diaspora-international';
    name: string;
    estimatedDays: string;
    feeNgn: number;
    description: string;
  }[];
}
