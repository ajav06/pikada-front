export const formatNumber = (number) => {
  const format = new Intl.NumberFormat('de-DE');
  return format.format(number);
};

export const formatCurrency = (number) => {
  const format = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'USD',
  });
  return format.format(number);
};
