import { render, screen } from '@testing-library/react';
import AccountBalance from '../../../../../src/lib/components/dashboard/AccountBalance';
import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import mockDict from '../../../../../mocks/dict';
import { IAuthContextType } from 'src/lib/interfaces/IAuthContextType';

describe('AccountBalance component', () => {
  it('should render user account balance if user is not null', () => {
    render(
      <AuthContext.Provider
        value={
          {
            authState: {
              user: { accountBalanceGBP: 5000, accountBalanceUSD: 5000 },
            },
          } as IAuthContextType
        }
      >
        <AccountBalance
          translation={mockDict.dashboard.header.accountBalance}
        />
      </AuthContext.Provider>
    );

    expect(
      screen.getByText('Account Balance: £ 5000.00 | $ 5000.00')
    ).toBeInTheDocument();
  });

  it('should render placeholder if user is null', () => {
    render(
      <AuthContext.Provider
        value={
          {
            authState: {
              user: null,
            },
          } as IAuthContextType
        }
      >
        <AccountBalance
          translation={mockDict.dashboard.header.accountBalance}
        />
      </AuthContext.Provider>
    );

    expect(screen.queryByText('Account Balance')).not.toBeInTheDocument();
    expect(screen.getByTestId('acc-balance')).toBeInTheDocument();
  });
});
