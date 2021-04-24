const calculateTickValues = (itemsQuantity) => {
  if (itemsQuantity >= 0 && itemsQuantity <= 144) {
    const multiplier = Math.floor(itemsQuantity / 12);
    return `every ${multiplier >= 1 ? multiplier * 5 : 5} minute`;
  }

  if (itemsQuantity > 144 && itemsQuantity <= 3456) {
    const multiplier = Math.floor(itemsQuantity / 144);
    return `every ${multiplier >= 1 ? multiplier * 5 : 1} hour`;
  }

  return 'every 1 day';
};

export default calculateTickValues;
