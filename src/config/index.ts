import defaultConfig from './pantry.config.json';
import { PantryConfig } from '../types';

const STORAGE_KEY_PANTRY_CONFIG = 'akinnike_pantry_config_v2';

export function getPantryConfig(): PantryConfig {
  const fallback = defaultConfig as unknown as PantryConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PANTRY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          ...fallback,
          ...parsed,
          brand: { ...fallback.brand, ...(parsed.brand || {}) },
          channels: {
            ...fallback.channels,
            ...(parsed.channels || {}),
            whatsapp: { ...fallback.channels.whatsapp, ...(parsed.channels?.whatsapp || {}) },
            telegram: { ...fallback.channels.telegram, ...(parsed.channels?.telegram || {}) },
            instagram: { ...fallback.channels.instagram, ...(parsed.channels?.instagram || {}) },
          },
          backendApi: { ...fallback.backendApi, ...(parsed.backendApi || {}) },
          shippingEstimates: parsed.shippingEstimates?.length ? parsed.shippingEstimates : fallback.shippingEstimates,
          currencies: parsed.currencies || fallback.currencies,
          featureFlags: { ...fallback.featureFlags, ...(parsed.featureFlags || {}) },
        };
      }
    }
  } catch (err) {
    console.error('Error reading saved config:', err);
  }
  return fallback;
}

export function savePantryConfig(newConfig: PantryConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_PANTRY_CONFIG, JSON.stringify(newConfig));
  } catch (err) {
    console.error('Error saving config:', err);
  }
}

export function resetPantryConfigToDefaults(): PantryConfig {
  try {
    localStorage.removeItem(STORAGE_KEY_PANTRY_CONFIG);
  } catch (err) {
    console.error('Error resetting config:', err);
  }
  return defaultConfig as unknown as PantryConfig;
}
