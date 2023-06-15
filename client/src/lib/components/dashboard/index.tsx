import { Locale } from 'src/lib/i18n/config';
import Header from './Header';
import { IDictionary } from 'src/lib/interfaces/IDictionary';
import tradingImg from '../../../../public/images/tradingImage.jpg';
import Image from 'next/image';
import Trade from './Trade';

interface Props {
  locale: Locale;
  dict: IDictionary;
}

function Dashboard({ locale, dict }: Props) {
  return (
    <div className="col">
      <div className="row p-3">
        <Header locale={locale} currencyPair="GBPUSD" dict={dict} />
      </div>
      <div className="row p-3">
        <Image
          className="dashboard-image"
          alt="trading-image"
          src={tradingImg}
        />
      </div>
      <div className="row">
        <Trade
          locale={locale}
          dict={dict}
          baseCurrency="GBP"
          currencyPair="GBPUSD"
        />
      </div>
    </div>
  );
}

export default Dashboard;
