import { ITrade } from './ITrade';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  accountBalanceGBP: number;
  accountBalanceUSD: number;
  trades: ITrade[];
}

export type IUserCreation = Pick<IUser, 'name' | 'email' | 'password'>;

export type ILoginCredentials = Pick<IUser, 'email' | 'password'>;
