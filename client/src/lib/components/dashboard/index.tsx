import { Locale } from '../../i18n/config';
import Header from './Header';
import { IDictionary } from '../../interfaces/IDictionary';
import tradingImg from '../../../../public/images/tradingImage.jpg';
import Image from 'next/image';
import Trade from './Trade';

interface Props {
  locale: Locale;
  dict: IDictionary;
  baseCurrency: string;
  currencyPair: string;
}

function Dashboard({ locale, dict, baseCurrency, currencyPair }: Props) {
  return (
    <div className="col">
      <div className="row p-3">
        <Header locale={locale} currencyPair={currencyPair} dict={dict} />
      </div>
      <div className="row p-3">
        <Image
          data-testid="trading-image"
          className="dashboard-image"
          alt="trading-image"
          src={tradingImg}
        />
      </div>
      <div className="row">
        <Trade
          data-testid="trade"
          locale={locale}
          dict={dict}
          baseCurrency={baseCurrency}
          currencyPair={currencyPair}
        />
      </div>
    </div>
  );
}

export default Dashboard;
