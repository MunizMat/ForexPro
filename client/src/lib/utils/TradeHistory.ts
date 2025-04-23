import { Locale } from '../i18n/config';
import { IDictionary, TradeType } from '../interfaces/IDictionary';
import { ITrade } from '../interfaces/ITrade';
import dateFormatter from './formatDate';

export default class TradeHistory {
  constructor(public trades: ITrade[]) {
    this.trades = trades;
  }

  formatDate(locale: Locale) {
    this.trades = this.trades.map((trade) => {
      return {
        ...trade,
        createdAt: dateFormatter(new Date(trade.createdAt), locale),
      };
    });
    return this;
  }

  translate(dict: IDictionary) {
    return this.trades.map((trade) => {
      return {
        ...trade,
        tradeType: dict.other.tradeType[trade.tradeType as keyof TradeType],
      };
    });
  }
}
