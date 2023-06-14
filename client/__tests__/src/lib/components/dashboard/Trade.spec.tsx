import Trade from '../../../../../src/lib/components/dashboard/Trade';
import { render, screen } from '@testing-library/react';
import useSocket from '../../../../../src/lib/hooks/useSocket';
import useTrade from '../../../../../src/lib/hooks/useTrade';
import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import TradeType from '../../../../../src/lib/components/dashboard/TradeType';
import mockDict from '../../../../../mocks/dict';

jest.mock('../../../../../src/lib/hooks/useSocket', () => jest.fn());
jest.mock('../../../../../src/lib/hooks/useTrade', () =>
  jest.fn().mockReturnValue({ handleTrad: jest.fn(), setAmount: jest.fn() })
);
jest.mock('../../../../../src/lib/components/dashboard/TradeType', () =>
  jest.fn()
);

describe('Trade component', () => {
  it('should render loader if data is null', () => {
    (useSocket as jest.Mock).mockReturnValueOnce({ data: null });

    render(
      <Trade
        currencyPair="GBPUSD"
        baseCurrency="GBP"
        dict={mockDict}
        locale="en-US"
      />
    );

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('should render TradeType with correct props if data is not null', () => {
    const mockData = {
      updatedAt: '2022-03-15',
      askPrice: 2,
      bidPrice: 1.5,
    };

    const mockBuyProps = {
      tradeType: 'Buy',
      updatedAt: '2022-03-15',
      exchangeRate: 2,
      baseCurrency: 'GBP',
      tradeHandler: jest.fn(),
    };
    const mockSellProps = {
      tradeType: 'Sell',
      updatedAt: '2022-03-15',
      exchangeRate: 1.5,
      baseCurrency: 'GBP',
      tradeHandler: jest.fn(),
    };

    (useSocket as jest.Mock).mockReturnValueOnce({ data: mockData });

    render(
      <Trade
        dict={mockDict}
        locale="en-US"
        baseCurrency="GBP"
        currencyPair="GBPUSD"
      />
    );

    expect(TradeType).toHaveBeenCalled();
  });
});
