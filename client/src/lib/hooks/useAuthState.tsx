import { useEffect, useState } from 'react';
import { IAuthState } from '../interfaces/IAuthState';
import persistAuthState from '../utils/persistAuthState';
import parseLocalStorage from '../utils/parseLocalStorage';

export const useAuthState = () => {
  const [authState, setAuthState] = useState<IAuthState>(() => {
    const { user, token } = parseLocalStorage();

    return {
      isAuthenticated: !!token && !!user,
      user,
      token,
    };
  });

  useEffect(() => {
    persistAuthState(authState);
  }, [authState]);

  return { authState, setAuthState };
};
