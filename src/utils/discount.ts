export const discount = (originPrice: number, salePrice: number) => {
  const discountedPrice = originPrice - salePrice;
  const discountedPercentage = discountedPrice / (originPrice / 100);

  return discountedPercentage + "%";
};
