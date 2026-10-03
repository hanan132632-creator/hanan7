import { Currency } from '../types';

export function formatPrice(priceSAR: number, currency: Currency): string {
  let value = priceSAR;
  let symbol = 'ر.س';

  if (currency === 'AED') {
    value = priceSAR * 0.98;
    symbol = 'د.إ';
  } else if (currency === 'USD') {
    value = priceSAR / 3.75;
    symbol = '$';
  }

  const formattedNum = new Intl.NumberFormat('ar-SA', {
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
  }).format(value);

  return `${formattedNum} ${symbol}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-SA').format(num);
}
