import Header from '../../../../../src/lib/components/dashboard/Header';
import { render, screen } from '@testing-library/react';
import mockDict from '../../../../../mocks/dict';

describe('Dashboard Header', () => {
  const mockCurrencyPair = 'GBPUSD';

  it('should render the header with account balance and currency dropdown', () => {
    render(
      <Header currencyPair={mockCurrencyPair} dict={mockDict} locale="en-US" />
    );

    const currencyPairElement = screen.getByText(mockCurrencyPair);
    expect(currencyPairElement).toBeInTheDocument();

    const currencyDropdownElement = screen.getByText('Currency Pair');
    expect(currencyDropdownElement).toBeInTheDocument();

    const tradeHistoryElement = screen.getByText('Trade History');
    expect(tradeHistoryElement).toBeInTheDocument();
  });
});
