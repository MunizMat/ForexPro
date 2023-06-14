import Trade from 'src/lib/components/dashboard/Trade';
import { Locale } from 'src/lib/i18n/config';
import { getDictionary } from 'src/lib/i18n/getDictionary';

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <Trade
      locale={params.lang}
      dict={dict}
      baseCurrency="USD"
      currencyPair="USDGBP"
    />
  );
}
