import api from '../config/axios';
// import { handleError } from '../utils/handleError';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { ITrade, ITradeCreation } from '../interfaces/ITrade';
import { IUser } from '../interfaces/IUser';
import { IDictionary } from '../interfaces/IDictionary';

interface TradeCompletedData {
  updatedUser: IUser;
  newTrade: ITrade;
}

export type TradeResponse = AxiosResponse<TradeCompletedData>;

export const saveTrade = async (
  user: IUser,
  userToken: string,
  newTrade: ITradeCreation,
  dict: IDictionary
) => {
  const body = {
    ...newTrade,
    userId: user.id,
  };
  const response: TradeResponse = await toast.promise(
    api.post('/trades', body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }),
    {
      pending: dict.toasts.pending.trade,
      // success: dict.toasts.success.tradeProcessing,
      error: dict.toasts.error.trade,
    }
  );

  return response.data;
};

export default saveTrade;
