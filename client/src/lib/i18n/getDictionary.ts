import 'server-only';
import { Locale } from './config';

export const getDictionary = async (locale: Locale) =>
  import(`./dictionaries/${locale}.json`).then((module) => module.default);
