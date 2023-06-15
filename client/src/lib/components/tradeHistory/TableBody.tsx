import { useContext } from 'react';
import { AuthContext } from 'src/lib/contexts/AuthContext';
import { Locale } from 'src/lib/i18n/config';
import { IDictionary } from 'src/lib/interfaces/IDictionary';
import TradeHistory from 'src/lib/utils/TradeHistory';
import Loader from '../others/Loader';

interface Props {
  locale: Locale;
  dict: IDictionary;
}

export default function TableBody({ locale, dict }: Props) {
  const { user } = useContext(AuthContext).authState;

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
      {!formattedTrades && <Loader />}
    </tbody>
  );
}
