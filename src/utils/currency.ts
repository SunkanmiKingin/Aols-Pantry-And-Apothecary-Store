import { CurrencyCode } from '../types';
import { getPantryConfig } from '../config';

export function formatPrice(
  priceNgn: number,
  currency: CurrencyCode = 'NGN',
  includeDualNgnNote: boolean = false
): string {
  const config = getPantryConfig();
  const currencyInfo = config.currencies[currency] || { symbol: '₦', rateToNgn: 1, label: 'NGN' };

  if (currency === 'NGN') {
    return `₦${priceNgn.toLocaleString('en-NG')}`;
  }

  const converted = priceNgn / currencyInfo.rateToNgn;
  const formattedForeign = `${currencyInfo.symbol}${converted.toFixed(2)}`;

  if (includeDualNgnNote) {
    return `${formattedForeign} (~₦${priceNgn.toLocaleString('en-NG')})`;
  }

  return formattedForeign;
}

export function convertNgnToCurrency(priceNgn: number, currency: CurrencyCode): number {
  const config = getPantryConfig();
  const currencyInfo = config.currencies[currency] || { symbol: '₦', rateToNgn: 1 };
  if (currency === 'NGN') return priceNgn;
  return Number((priceNgn / currencyInfo.rateToNgn).toFixed(2));
}
