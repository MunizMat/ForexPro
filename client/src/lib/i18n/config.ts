import brazilFlag from '../../../public/images/brazil.png';
import usFlag from '../../../public/images/united-states.png';

export const i18n = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'pt-BR'],
  images: { 'en-US': usFlag, 'pt-BR': brazilFlag },
} as const;

export type Locale = (typeof i18n)['locales'][number];
