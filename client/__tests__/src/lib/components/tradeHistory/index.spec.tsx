import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import mockDict from '../../../../../mocks/dict';
import TradeHistory from '../../../../../src/lib/components/tradeHistory';
import TradeHistoryTable from '../../../../../src/lib/components/tradeHistory/Table';
import { render, screen } from '@testing-library/react';
import { IAuthContextType } from '../../../../../src/lib/interfaces/IAuthContextType';

jest.mock('../../../../../src/lib/components/tradeHistory/Table', () =>
  jest.fn()
);

describe('TradeHistory component', () => {
  const mockValue = {
    authState: {
      user: {
        trades: [],
      },
    },
  } as unknown as IAuthContextType;

  it('should render trade history', () => {
    render(
      <AuthContext.Provider value={mockValue}>
        <TradeHistory dict={mockDict} locale="en-US" />
      </AuthContext.Provider>
    );

    const container = screen.getByTestId('trade-history-component');
    const ttile = screen.getByText('Trade History');

    expect(container).toBeInTheDocument();
    expect(ttile).toBeInTheDocument();
    expect(TradeHistoryTable).toHaveBeenCalled();
  });
});
