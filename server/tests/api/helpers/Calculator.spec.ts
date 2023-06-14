import { Calculator } from '../../../src/api/helpers/Calculator';

describe('Calculator', () => {
  describe('convertCurrencies', () => {
    it('should return the converted amount', () => {
      const baseCurrencyAmount = 100;
      const exchangeRate = 1.5;

      const convertedAmount = Calculator.convertCurrencies(
        baseCurrencyAmount,
        exchangeRate,
      );

      expect(convertedAmount).toBe(150);
    });

    it('should return 0 if the base currency amount is 0', () => {
      const baseCurrencyAmount = 0;
      const exchangeRate = 1.5;

      const convertedAmount = Calculator.convertCurrencies(
        baseCurrencyAmount,
        exchangeRate,
      );

      expect(convertedAmount).toBe(0);
    });

    it('should return 0 if the exchange rate is 0', () => {
      const baseCurrencyAmount = 100;
      const exchangeRate = 0;

      const convertedAmount = Calculator.convertCurrencies(
        baseCurrencyAmount,
        exchangeRate,
      );

      expect(convertedAmount).toBe(0);
    });

    it('should return a negative amount if the base currency amount is negative', () => {
      const baseCurrencyAmount = -100;
      const exchangeRate = 1.5;

      const convertedAmount = Calculator.convertCurrencies(
        baseCurrencyAmount,
        exchangeRate,
      );

      expect(convertedAmount).toBe(-150);
    });
  });
});
