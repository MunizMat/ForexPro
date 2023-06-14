import { Locale } from 'src/lib/i18n/config';
import { IDictionary } from '../IDictionary';

export interface TradeTypeProps {
  i18nData: {
    dict: IDictionary;
    locale: Locale;
  };
  tradeData: {
    baseCurrency: string;
    exchangeRate: number;
    tradeType: string;
    currencyPair: string;
  };
  updatedAt: Date;
}
