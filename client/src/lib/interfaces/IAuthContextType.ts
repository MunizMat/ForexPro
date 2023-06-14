/* eslint-disable no-unused-vars */
import { IAuthState } from './IAuthState';
import { ILoginCredentials, IUserCreation } from './IUser';

export interface IAuthContextType {
  authState: IAuthState;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (userData: IUserCreation) => Promise<void>;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}
