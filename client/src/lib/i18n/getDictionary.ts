import 'server-only';
import { IDictionaries } from 'src/lib/interfaces/IDictionaries';
import { Locale } from './config';

const dictionaries: IDictionaries = {
  'en-US': () =>
    import('./dictionaries/en-US.json').then((module) => module.default),
  'pt-BR': () =>
    import('./dictionaries/pt-BR.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
