export const formatCurrency = (value: number): string => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteValue);

  return isNegative ? `-${formatted}` : formatted;
};

export const formatCrypto = (value: number, coin: string): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 6,
  }).format(value);
  
  return `${formatted} ${coin}`;
};
