import { useContext, useState } from 'react';
import validateTrade from '../validations/validateTrade';
import { saveTrade } from '../services/tradeService';
import { AuthContext } from '../contexts/AuthContext';
import { IDictionary } from '../interfaces/IDictionary';
import { IUser } from '../interfaces/IUser';
import { ITradeCreation } from '../interfaces/ITrade';

const useTrade = (currencyPair: string, dict: IDictionary) => {
  const { user, token } = useContext(AuthContext).authState as {
    user: IUser;
    token: string;
  };
  const [amount, setAmount] = useState('');

  const handleTrade = async (
    tradeData: Omit<ITradeCreation, 'amount'>,
    accountBalance: number
  ) => {
    const canProceedWithTrade = validateTrade(amount, accountBalance, dict);
    if (!canProceedWithTrade) return;

    const trade = {
      currencyPair: tradeData.currencyPair,
      baseCurrency: tradeData.baseCurrency,
      tradeType: tradeData.tradeType,
      amount: parseFloat(amount),
      exchangeRate: tradeData.exchangeRate,
    };

    await saveTrade(user, token, trade, dict);
  };

  return { handleTrade, setAmount };
};

export default useTrade;
