import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: 'NGN',
    symbol: '₦',
    label: 'Nigerian Naira (NGN)',
    rateToNgn: 1,
    exchangeRateFromNgn: 1,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'US Dollar (USD)',
    rateToNgn: 1550,
    exchangeRateFromNgn: 1 / 1550,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'British Pound (GBP)',
    rateToNgn: 2020,
    exchangeRateFromNgn: 1 / 2020,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'Euro (EUR)',
    rateToNgn: 1710,
    exchangeRateFromNgn: 1 / 1710,
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    label: 'Ghanaian Cedi (GHS)',
    rateToNgn: 105,
    exchangeRateFromNgn: 1 / 105,
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    label: 'Kenyan Shilling (KES)',
    rateToNgn: 12,
    exchangeRateFromNgn: 1 / 12,
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    label: 'South African Rand (ZAR)',
    rateToNgn: 88,
    exchangeRateFromNgn: 1 / 88,
  },
};

export function convertNgnToCurrency(amountNgn: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.NGN;
  const converted = amountNgn * config.exchangeRateFromNgn;
  if (targetCurrency === 'NGN') {
    return Math.round(converted);
  }
  return Number(converted.toFixed(2));
}

export function formatPrice(amountNgn: number, targetCurrency: CurrencyCode = 'NGN'): string {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.NGN;
  const value = convertNgnToCurrency(amountNgn, targetCurrency);
  
  if (targetCurrency === 'NGN') {
    return `${config.symbol}${value.toLocaleString('en-NG')}`;
  }
  return `${config.symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
