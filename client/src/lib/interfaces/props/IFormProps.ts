import { Locale } from 'src/lib/i18n/config';
import { IDictionary } from '../IDictionary';

export interface IFormProps {
  dict: IDictionary;
  locale?: Locale;
}
