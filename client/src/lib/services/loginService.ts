import { AxiosResponse } from 'axios';
import api from '../config/axios';
import { handleError } from '../utils/handleError';
import { toast } from 'react-toastify';
import { IUser, ILoginCredentials } from '../interfaces/IUser';
import { IDictionary } from '../interfaces/IDictionary';

export type LoginResponseType = AxiosResponse<{ user: IUser; token: string }>;

const loginService = async (
  credentials: ILoginCredentials,
  dict: IDictionary
) => {
  const response: LoginResponseType = await toast.promise(
    api.post('/auth', credentials),
    {
      pending: dict.toasts.pending.login,
      success: dict.toasts.success.login,
      error: {
        render({ data }) {
          return dict.apiErrors[handleError(data)];
        },
      },
    },
    {
      pauseOnHover: false,
    }
  );
  return response;
};

export default loginService;
