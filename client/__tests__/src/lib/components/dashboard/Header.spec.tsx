import { IUser } from 'src/lib/interfaces/IUser';
import Header from '../../../../../src/lib/components/dashboard/Header';
import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { IAuthContextType } from '../../../../../src/lib/interfaces/IAuthContextType';
import mockDict from '../../../../../mocks/dict';

describe('Dashboard Header', () => {
  const mockCurrencyPair = 'GBPUSD';
  const mockUser = {
    accountBalanceGBP: 5000,
    accountBalanceUSD: 4000,
  } as IUser;

  const providerValue = { authState: { user: mockUser } } as IAuthContextType;

  it('should render the header with account balance and currency dropdown', () => {
    render(
      <AuthContext.Provider value={providerValue}>
        <Header
          currencyPair={mockCurrencyPair}
          dict={mockDict}
          locale="en-US"
        />
      </AuthContext.Provider>
    );

    const currencyPairElement = screen.getByText(mockCurrencyPair);
    expect(currencyPairElement).toBeInTheDocument();

    const accountBalanceElement = screen.getByText(
      `Account Balance: £ ${mockUser.accountBalanceGBP.toFixed(
        2
      )} | $ ${mockUser.accountBalanceUSD.toFixed(2)}`
    );
    expect(accountBalanceElement).toBeInTheDocument();

    const currencyDropdownElement = screen.getByText('Currency Pair');
    expect(currencyDropdownElement).toBeInTheDocument();

    const tradeHistoryElement = screen.getByText('Trade History');
    expect(tradeHistoryElement).toBeInTheDocument();
  });
});
