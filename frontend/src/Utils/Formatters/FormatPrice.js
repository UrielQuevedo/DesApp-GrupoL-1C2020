const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  return `$${formatter.format(price)}`;
};

export default formatPrice;