import { useContext, useState } from 'react';
import validateTrade from '../validations/validateTrade';
import { saveTrade } from '../services/tradeService';
import { AuthContext } from '../contexts/AuthContext';
import { IDictionary } from '../interfaces/IDictionary';
import { IUser } from '../interfaces/IUser';
import { ITradeCreation } from '../interfaces/ITrade';
import getTradeTypeTranslation from '../utils/getTradeTypeTranslation';
import { toast } from 'react-toastify';

const useTrade = (currencyPair: string, dict: IDictionary) => {
  const { user, token } = useContext(AuthContext).authState as {
    user: IUser;
    token: string;
  };

  const { setAuthState } = useContext(AuthContext);
  const [amount, setAmount] = useState('');

  const handleTrade = async (tradeData: Omit<ITradeCreation, 'amount'>) => {
    const accountBalance =
      tradeData.baseCurrency === 'GBP'
        ? user.accountBalanceGBP
        : user.accountBalanceUSD;
    const canProceedWithTrade = validateTrade(amount, accountBalance, dict);
    if (!canProceedWithTrade) return;

    const trade = {
      currencyPair: tradeData.currencyPair,
      baseCurrency: tradeData.baseCurrency,
      tradeType: tradeData.tradeType,
      amount: parseFloat(amount),
      exchangeRate: tradeData.exchangeRate,
    };

    const { newTrade, updatedUser } = await saveTrade(user, token, trade, dict);

    setAuthState((prevAuthState) => ({
      // Use functional update for safety
      ...prevAuthState,
      user: updatedUser,
    }));
    toast.success(
      `${dict.toasts.success.trade} | ${getTradeTypeTranslation(
        updatedUser,
        dict
      )} - ${newTrade.amount} ${newTrade.baseCurrency}`
    );
  };

  return { handleTrade, setAmount };
};

export default useTrade;
