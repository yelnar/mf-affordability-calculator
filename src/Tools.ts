/**
 * Formats money value
 * @param  {number} amount
 * @param  {number} precision
 * @return {string}
 */
export const formatCurrency = (amount: number, precision: number = 0): string => {
  if (typeof(amount) !== 'undefined') {
    return amount.toFixed(precision).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return '0';
};

export const toNumberFormat = (n: string): string => {
  return formatCurrency(toNumber(String(n)));
};

export const removeNumberFormat = (numberString: string): string => {
  return numberString ? numberString.replace(/\s+|,/g, '') : '';
};

export const toNumber = (n: string): number => {
  return Number(removeNumberFormat(String(n)));
};
