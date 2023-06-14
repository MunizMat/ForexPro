import { ITrade } from '../../../../../src/lib/interfaces/ITrade';
import TradeHistoryTable from '../../../../../src/lib/components/tradeHistory/Table';
import { render, screen } from '@testing-library/react';
import mockDict from '../../../../../mocks/dict';

describe('TradeHistory component', () => {
  const mockTrades: ITrade[] = [
    {
      amount: 500,
      tradeType: 'Buy',
      baseCurrency: 'GBP',
      currencyPair: 'GBPUSD',
      createdAt: new Date('2020-03-03') as unknown as string,
      exchangeRate: 2,
      id: 1,
      userId: 1,
    },
  ];

  it('should render trade history', () => {
    render(
      <TradeHistoryTable dict={mockDict} locale="en-US" trades={mockTrades} />
    );

    const exchangeRate = screen.getByText('2');
    const amount = screen.getByText('500');
    const baseCurrency = screen.getByText('GBP');
    const currencyPair = screen.getByText('GBPUSD');
    const tradeType = screen.getByText('Buy');

    expect(exchangeRate).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
    expect(baseCurrency).toBeInTheDocument();
    expect(currencyPair).toBeInTheDocument();
    expect(tradeType).toBeInTheDocument();
  });
});
