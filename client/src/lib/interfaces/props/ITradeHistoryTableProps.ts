import { Locale } from 'src/lib/i18n/config';
import { IDictionary } from '../IDictionary';
import { ITrade } from '../ITrade';

export interface ITradeHistoryTableProps {
  trades: ITrade[];
  dict: IDictionary;
  locale: Locale;
}
