import { TradeHistory } from 'src/lib/interfaces/IDictionary';

export default function TableHeaders(props: TradeHistory) {
  return (
    <thead>
      <tr>
        <th>{props.timestamp}</th>
        <th>{props.currencyPair}</th>
        <th>{props.baseCurrency}</th>
        <th>{props.type}</th>
        <th>{props.exchangeRate}</th>
        <th>{props.amount}</th>
      </tr>
    </thead>
  );
}
