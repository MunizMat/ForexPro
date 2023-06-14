import Header from 'src/lib/components/dashboard/Header';
import Image from 'next/image';
import tradingImg from '@/images/tradingImage.jpg';
import { ReactNode } from 'react';
import { getDictionary } from 'src/lib/i18n/getDictionary';
import { Locale } from 'src/lib/i18n/config';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="container bg-dark w-75 dashboard mt-5">
      <div className="col">
        <div className="row p-3">
          <Header locale={params.lang} currencyPair="GBPUSD" dict={dict} />
        </div>
        <div className="row p-3">
          <Image
            className="dashboard-image"
            alt="trading-image"
            src={tradingImg}
          />
        </div>
        <div className="row">{children}</div>
      </div>
    </div>
  );
}
