import { IUser } from '../interfaces/IUser';
import { IDictionary } from '../interfaces/IDictionary';

export default function getTradeTypeTranslation(
  user: IUser,
  dict: IDictionary
) {
  const { buy, sell } = dict.dashboard.trade;
  const lastIndex = user.trades.length - 1;
  return user.trades[lastIndex].tradeType === 'Buy' ? buy : sell;
}
