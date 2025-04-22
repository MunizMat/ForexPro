import 'server-only';
import { Locale } from './config';
import { IDictionary } from '../interfaces/IDictionary';

export const getDictionary = async (locale: Locale): Promise<IDictionary> =>
  import(`./dictionaries/${locale}.json`).then((module) => module.default);
