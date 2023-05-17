const formatPrice = (price) => {
  let formatedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  }).format((price / 1).toFixed(2));

  return formatedPrice;
};

export { formatPrice };
