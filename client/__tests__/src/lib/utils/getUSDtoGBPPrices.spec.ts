import getUSDtoGBPPrices from '../../../../src/lib/utils/getUSDtoGBPPrices';

describe('getUSDtoGBPPrices utility function', () => {
  it('should get the prices correctly', () => {
    const bidPriceGBP = 2;
    const askPriceGBP = 4;
    const usdPrices = getUSDtoGBPPrices(bidPriceGBP, askPriceGBP);

    expect(usdPrices.askPriceUSD).toBe('0.50000');
    expect(usdPrices.bidPriceUSD).toBe('0.25000');
  });
});
