export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'GHS' | 'KES' | 'ZAR';

export interface ProductVariation {
  id: string;
  sku: string;
  name: string;
  sizeGrams: number;
  priceNgn: number;
  inStock: boolean;
  cutOrGrindOptions?: string[];
  heatLevels?: string[];
  dietaryBadges?: string[];
}

export interface ReviewItem {
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'signature-concoctions' | 'flavoured-proteins' | 'pantry-essentials' | 'botanical-teas';
  categoryName: string;
  advertisedFirst: boolean;
  badge?: string;
  description: string;
  longDescription: string;
  originAndProcess: string;
  ingredients: string[];
  culinaryUses: string[];
  storageInstructions: string;
  variations: ProductVariation[];
  landingPageUrl: string;
  featuredReviews?: ReviewItem[];
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
  email?: string;
  address: string;
  city?: string;
  stateOrRegion: string;
  country: string;
  deliveryZone: string;
  notes?: string;
  preferredChannel?: 'whatsapp' | 'web_storefront' | 'telegram' | 'instagram';
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  sessionRef: string;
  date: string;
  customer: CustomerOrderData;
  items: CartItem[];
  subtotalNgn: number;
  shippingEstimateRange: string;
  currency: CurrencyCode;
  approxCurrencyAmount?: number;
  status: 'new' | 'contacted' | 'packed' | 'dispatched' | 'completed';
  channel: 'whatsapp' | 'web_storefront';
  webhookDispatched: boolean;
  webhookResponseStatus?: number;
}

export interface ShippingZoneEstimate {
  id: string;
  name: string;
  coverage: string;
  deliveryDays: string;
  minNgn: number;
  maxNgn: number;
  note: string;
}

export interface CurrencyConfig {
  symbol: string;
  label: string;
  rateToNgn: number;
}

export interface PantryConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    address: string;
    email: string;
  };
  channels: {
    whatsapp: {
      enabled: boolean;
      number: string;
      countryCode: string;
      displayNumber: string;
      welcomePrompt: string;
    };
    telegram: {
      enabled: boolean;
      handle: string;
      url: string;
      note: string;
    };
    instagram: {
      enabled: boolean;
      handle: string;
      url: string;
      note: string;
    };
  };
  backendApi: {
    webhookUrl: string;
    secretToken: string;
    timeoutMs: number;
    retryAttempts: number;
  };
  shippingEstimates: ShippingZoneEstimate[];
  currencies: Record<CurrencyCode, CurrencyConfig>;
  featureFlags: {
    enableOrderOnWebsite: boolean;
    enableDirectWhatsApp: boolean;
    enableHandoffSessionRef: boolean;
    enableChefBatchInquiry: boolean;
  };
}
