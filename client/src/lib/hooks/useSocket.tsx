import { useContext, useEffect, useState } from 'react';
import { IDashboardServerResponse } from '../interfaces/ServerResponses/IDashboardServerResponse';
import { io } from 'socket.io-client';
import getUSDtoGBPPrices from '../utils/getUSDtoGBPPrices';
import { IUser } from '../interfaces/IUser';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { IDictionary } from '../interfaces/IDictionary';
import getTradeTypeTranslation from '../utils/getTradeTypeTranslation';
import { ITrade } from '../interfaces/ITrade';

interface TradeCompletedResponse {
  updatedUser: IUser;
  newTrade: ITrade;
}

export const useSocket = (currencyPair: string, dict: IDictionary) => {
  const [data, setData] = useState<IDashboardServerResponse | null>(null);
  const { setAuthState, authState } = useContext(AuthContext);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    const user = authState.user as IUser;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit('userId', user.id);

    socket.on(
      'tradeCompleted',
      ({ updatedUser, newTrade }: TradeCompletedResponse) => {
        setAuthState({
          isAuthenticated: true,
          token: authState.token,
          user: updatedUser,
        });
        toast.success(
          `${dict.toasts.success.trade} | ${getTradeTypeTranslation(
            updatedUser,
            dict
          )} - ${newTrade.amount} ${newTrade.baseCurrency}`
        );
      }
    );

    socket.on('tradeFailed', () => {
      toast.error(dict.toasts.error.trade);
    });

    socket.on('sendRates', (data: IDashboardServerResponse) => {
      if (currencyPair === 'GBPUSD') setData(data);
      else {
        const { askPriceUSD, bidPriceUSD } = getUSDtoGBPPrices(
          data.bidPrice,
          data.askPrice
        );

        setData({
          askPrice: parseFloat(askPriceUSD),
          bidPrice: parseFloat(bidPriceUSD),
          updatedAt: data.updatedAt,
          symbol: data.symbol,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { data };
};

export default useSocket;
