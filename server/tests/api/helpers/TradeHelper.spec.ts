import { Trade } from '@prisma/client';
import TradeHelper from '../../../src/api/helpers/TradeHelper';

describe('TradeHelper', () => {
  const trade: Trade = {
    id: 1,
    userId: 1,
    currencyPair: 'GBPUSD',
    baseCurrency: 'GBP',
    tradeType: 'Buy',
    amount: 100,
    exchangeRate: 1.5,
    createdAt: new Date(),
  };

  describe('getAmounts', () => {
    it('should return the amounts in GBP and USD', () => {
      const tradeHelper = new TradeHelper(trade);

      const amounts = tradeHelper.getAmounts();

      expect(amounts).toEqual({ amountGBP: 100, amountUSD: -150 });
    });
  });

  describe('getAmount', () => {
    it('should return the amount in GBP', () => {
      const tradeHelper = new TradeHelper(trade);

      const amount = tradeHelper.getAmount('GBP');

      expect(amount).toBe(100);
    });

    it('should return the amount in USD', () => {
      const tradeHelper = new TradeHelper(trade);

      const amount = tradeHelper.getAmount('USD');

      expect(amount).toBe(-150);
    });
  });

  describe('getAmount with different base currency and trade type', () => {
    const tradeWithDifferentBaseCurrency: Trade = {
      ...trade,
      baseCurrency: 'USD',
    };

    it('should return the negative amount in GBP when trading USD as base currency and buying', () => {
      const tradeHelper = new TradeHelper(tradeWithDifferentBaseCurrency);

      const amount = tradeHelper.getAmount('GBP');

      expect(amount).toBe(-150);
    });

    it('should return the positive amount in USD when trading USD as base currency and buying', () => {
      const tradeHelper = new TradeHelper(tradeWithDifferentBaseCurrency);

      const amount = tradeHelper.getAmount('USD');

      expect(amount).toBe(100);
    });

    const tradeWithSellTradeType: Trade = {
      ...tradeWithDifferentBaseCurrency,
      tradeType: 'Sell',
    };

    it('should return the positive amount in GBP when trading USD as base currency and selling', () => {
      const tradeHelper = new TradeHelper(tradeWithSellTradeType);

      const amount = tradeHelper.getAmount('GBP');

      expect(amount).toBe(150);
    });

    it('should return the negative amount in USD when trading USD as base currency and selling', () => {
      const tradeHelper = new TradeHelper(tradeWithSellTradeType);

      const amount = tradeHelper.getAmount('USD');

      expect(amount).toBe(-100);
    });
  });
});
