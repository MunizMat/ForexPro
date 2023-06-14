import { IUser } from './IUser';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
}
