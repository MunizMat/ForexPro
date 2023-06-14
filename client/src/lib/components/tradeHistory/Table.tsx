'use client';
import { FC } from 'react';
import Table from 'react-bootstrap/Table';
import { ITradeHistoryTableProps } from '../../interfaces/props/ITradeHistoryTableProps';
import TradeHistory from '../../utils/TradeHistory';

export const TradeHistoryTable: FC<ITradeHistoryTableProps> = ({
  trades,
  dict,
  locale,
}) => {
  const formattedTrades = new TradeHistory(trades)
    .formatDate(locale, dict.other.timezone)
    .translate(dict);
  const { timestamp, currencyPair, baseCurrency, type, exchangeRate, amount } =
    dict.tradeHistory;

  return (
    <Table className="text-white" variant="dark" hover>
      <thead>
        <tr>
          <th>{timestamp}</th>
          <th>{currencyPair}</th>
          <th>{baseCurrency}</th>
          <th>{type}</th>
          <th>{exchangeRate}</th>
          <th>{amount}</th>
        </tr>
      </thead>
      <tbody>
        {formattedTrades.map((trade, index) => (
          <tr key={index}>
            <td>{trade.createdAt}</td>
            <td>{trade.currencyPair}</td>
            <td>{trade.baseCurrency}</td>
            <td>{trade.tradeType}</td>
            <td>{trade.exchangeRate}</td>
            <td>{trade.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TradeHistoryTable;
