import { Locale } from 'src/lib/i18n/config';
import { IDictionary } from '../IDictionary';

export interface ITradeProps {
  baseCurrency: string;
  currencyPair: string;
  dict: IDictionary;
  locale: Locale;
}
