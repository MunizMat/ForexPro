import { handleError } from '../utils/handleError';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import api from '../config/axios';
import { IUser, IUserCreation } from '../interfaces/IUser';
import { IDictionary } from '../interfaces/IDictionary';

export type SignupResponse = AxiosResponse<Omit<IUser, 'trades'>>;

const signupService = async (userData: IUserCreation, dict: IDictionary) => {
  const response: SignupResponse = await toast.promise(
    api.post('/auth', userData),
    {
      pending: dict.toasts.pending.signup,
      success: dict.toasts.success.signup,
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

export default signupService;
