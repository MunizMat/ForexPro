import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import Menu from '../../../../../src/lib/components/others/Navbar';
import React from 'react';
import '@testing-library/jest-dom';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

describe('Menu', () => {
  const mockAuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  const mockLogout = jest.fn();

  const authenticatedState = {
    isAuthenticated: true,
    user: {
      id: 1,
      name: 'Matheus',
      email: 'matheus@example.com',
      password: '',
      accountBalanceGBP: 5000,
      accountBalanceUSD: 5000,
      trades: [],
    },
    token: 'mockToken123',
  };
  const mockDict = {
    navbar: {
      logout: 'Logout',
      signup: 'Sign up',
      login: 'Login',
    },
  } as IDictionary;

  it('should render the menu with login and signup links when not authenticated', () => {
    render(
      <AuthContext.Provider
        value={{
          authState: mockAuthState,
          logout: mockLogout,
          login: jest.fn(),
          setAuthState: jest.fn(),
        }}
      >
        <Menu dict={mockDict} lang="en-US" />
      </AuthContext.Provider>
    );

    expect(screen.getByText('ForexPro')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render the menu with a logout link when authenticated', () => {
    render(
      <AuthContext.Provider
        value={{
          authState: authenticatedState,
          logout: mockLogout,
          login: jest.fn(),
          setAuthState: jest.fn(),
        }}
      >
        <Menu dict={mockDict} lang="en-US" />
      </AuthContext.Provider>
    );

    expect(screen.getByText('ForexPro')).toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call the logout function when clicking on the logout link', () => {
    render(
      <AuthContext.Provider
        value={{
          authState: authenticatedState,
          logout: mockLogout,
          login: jest.fn(),
          setAuthState: jest.fn(),
        }}
      >
        <Menu dict={mockDict} lang="en-US" />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });
});
