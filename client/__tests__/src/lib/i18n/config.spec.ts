import { i18n } from '../../../../src/lib/i18n/config';
import brazilFlag from '../../../public/images/brazil.png';
import usFlag from '../../../public/images/united-states.png';

describe('i18n configuration', () => {
  test('config object', () => {
    const expectedConfig = {
      defaultLocale: 'en-US',
      locales: ['en-US', 'pt-BR'],
      images: { 'en-US': usFlag, 'pt-BR': brazilFlag },
    };
    expect(i18n).toEqual(expectedConfig);
  });
});
