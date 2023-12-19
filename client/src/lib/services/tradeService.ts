import api from '../config/axios';
import { handleError } from '../utils/handleError';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { ITradeCreation } from '../interfaces/ITrade';
import { IUser } from '../interfaces/IUser';
import { IDictionary } from '../interfaces/IDictionary';

export type TradeResponse = AxiosResponse<{ user: IUser }>;

export const saveTrade = async (
  user: IUser,
  userToken: string,
  newTrade: ITradeCreation,
  dict: IDictionary
) => {
  try {
    const body = {
      user,
      newTrade,
    };
    const response: TradeResponse = await toast.promise(
      api.post(`/users/${user.user_id}/trade`, body, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      {
        pending: dict.toasts.pending.trade,
        success: dict.toasts.success.tradeProcessing,
        error: dict.toasts.error.trade,
      }
    );

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default saveTrade;
