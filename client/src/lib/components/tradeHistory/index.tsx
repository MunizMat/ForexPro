'use client';
import React, { FC } from 'react';
import { Container, Table } from 'react-bootstrap';
import { IDictionary } from '../../interfaces/IDictionary';
import { Locale } from '../../i18n/config';
import TableHeaders from './TableHeaders';
import TableBody from './TableBody';

interface Props {
  dict: IDictionary;
  locale: Locale;
}

const TradeHistory: FC<Props> = ({ dict, locale }) => {
  return (
    <Container
      id="trade-history"
      data-testid="trade-history-component"
      className="bg-dark"
    >
      <h1 className="mb-5 text-white">{dict.tradeHistory.title}</h1>

      <Table className="text-white" variant="dark" hover>
        <TableHeaders {...dict.tradeHistory} />
        <TableBody locale={locale} dict={dict} />
      </Table>
    </Container>
  );
};

export default TradeHistory;
