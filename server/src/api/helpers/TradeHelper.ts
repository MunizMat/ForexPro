import { Trade } from '@prisma/client';
import { Calculator } from './Calculator';

class TradeHelper {
  trade: Trade | Omit<Trade, 'id' | 'createdAt'>;
  constructor(trade: Trade | Omit<Trade, 'id' | 'createdAt'>) {
    this.trade = trade;
  }
  getAmounts() {
    return {
      amountGBP: this.getAmount('GBP'),
      amountUSD: this.getAmount('USD'),
    };
  }

  getAmount(currency: string) {
    const { baseCurrency, amount, tradeType, exchangeRate } = this.trade;

    if (baseCurrency === currency) {
      if (tradeType === 'Buy') return amount;
      return -amount;
    }

    if (tradeType === 'Buy')
      return -Calculator.convertCurrencies(amount, exchangeRate);
    return Calculator.convertCurrencies(amount, exchangeRate);
  }
}

export default TradeHelper;
