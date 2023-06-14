const getUSDtoGBPPrices = (bidPriceGBP: number, askPriceGBP: number) => {
  return {
    askPriceUSD: (1 / bidPriceGBP).toFixed(5),
    bidPriceUSD: (1 / askPriceGBP).toFixed(5),
  };
};

export default getUSDtoGBPPrices;
