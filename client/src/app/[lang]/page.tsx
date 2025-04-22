import { Locale } from 'src/lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';
import { HomePage } from 'src/lib/components/HomePage';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang);
  return <HomePage dict={dict} />;
}
