import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Locale } from '../../i18n/config';
import { IDictionary } from '../../interfaces/IDictionary';
import TradeHistory from '../../utils/TradeHistory';

interface Props {
  locale: Locale;
  dict: IDictionary;
}

export default function TableBody({ locale, dict }: Props) {
  const { user } = useContext(AuthContext).authState;

  console.log(user);

  const formattedTrades = user
    ? new TradeHistory(user.trades)
        .formatDate(locale, dict.other.timezone)
        .translate(dict)
    : null;

  return (
    <tbody>
      {formattedTrades &&
        formattedTrades.map((trade, index) => (
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
  );
}
