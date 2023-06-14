'use client';
import { FC, ReactNode } from 'react';
import { useAuthState } from '../hooks/useAuthState';
import loginService from '../services/loginService';
import { AuthContext } from '../contexts/AuthContext';
import { ILoginCredentials, IUserCreation } from '../interfaces/IUser';
import { useRouter } from 'next/navigation';
import { Locale } from '../i18n/config';
import { IDictionary } from '../interfaces/IDictionary';
import signupService from '../services/signupService';

interface Props {
  children: ReactNode;
  locale: Locale;
  dict: IDictionary;
}

export const AuthProvider: FC<Props> = ({ children, locale, dict }) => {
  const { authState, setAuthState } = useAuthState();
  const router = useRouter();

  const login = async (credentials: ILoginCredentials) => {
    let loginResponse;

    try {
      loginResponse = await loginService(credentials, dict);
    } catch (error) {
      return;
    }

    const { user, token } = loginResponse.data;
    setAuthState({ isAuthenticated: true, user, token });

    router.push(`/${locale}/dashboard/gbpusd`);
  };

  const logout = () => {
    router.push(`/${locale}`);

    setTimeout(() => {
      // Temporary bug fix when user logs out
      setAuthState({ isAuthenticated: false, user: null, token: null });
    }, 750);
  };

  const signup = async (userData: IUserCreation) => {
    try {
      await signupService(userData, dict);
    } catch (error) {
      return;
    }

    router.push(`${locale}/login`);
  };

  return (
    <AuthContext.Provider
      value={{ authState, signup, login, logout, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
