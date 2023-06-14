'use client';
import { FC } from 'react';
import { Row } from 'react-bootstrap';
import { ITradeProps } from '../../interfaces/props/ITradeProps';
import Loader from '../others/Loader';
import useSocket from '../../hooks/useSocket';
import TradeType from './TradeType';
import { ITradeCreation } from 'src/lib/interfaces/ITrade';

const Trade: FC<ITradeProps> = ({
  baseCurrency,
  currencyPair,
  dict,
  locale,
}) => {
  const { data } = useSocket(currencyPair, dict);

  const tradeData: Omit<ITradeCreation, 'amount'> = {
    baseCurrency,
    exchangeRate: data?.askPrice as number,
    tradeType: 'Buy',
    currencyPair,
  };

  const i18nData = { dict, locale };

  return (
    <Row className="my-4 mx-2">
      {data ? (
        <>
          <TradeType
            i18nData={i18nData}
            tradeData={tradeData}
            updatedAt={data.updatedAt}
          />
          <TradeType
            i18nData={i18nData}
            tradeData={{
              ...tradeData,
              tradeType: 'Sell',
              exchangeRate: data.bidPrice,
            }}
            updatedAt={data.updatedAt}
          />
        </>
      ) : (
        <Loader />
      )}
    </Row>
  );
};

export default Trade;
