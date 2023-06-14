'use client';
import React, { FC, useContext } from 'react';
import { Container } from 'react-bootstrap';
import TradeHistoryTable from './Table';
import { AuthContext } from '../../contexts/AuthContext';
import { IUser } from 'src/lib/interfaces/IUser';
import { IDictionary } from '../../interfaces/IDictionary';
import { Locale } from '../../i18n/config';

interface Props {
  dict: IDictionary;
  locale: Locale;
}

const TradeHistory: FC<Props> = ({ dict, locale }) => {
  const { user } = useContext(AuthContext).authState as { user: IUser };

  return (
    <Container
      id="trade-history"
      data-testid="trade-history-component"
      className="bg-dark"
    >
      <h1 className="mb-5 text-white">{dict.tradeHistory.title}</h1>

      <TradeHistoryTable locale={locale} trades={user.trades} dict={dict} />
    </Container>
  );
};

export default TradeHistory;
