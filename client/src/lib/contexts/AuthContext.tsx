import { createContext } from 'react';
import { IAuthContextType } from '../interfaces/IAuthContextType';

export const AuthContext = createContext<IAuthContextType>({
  authState: { isAuthenticated: false, user: null, token: null },
  login: async () => {
    return undefined;
  },
  signup: async () => {
    return undefined;
  },
  logout: () => {
    return;
  },
  setAuthState: () => {
    return;
  },
});
