import mockDict from '../../../../../mocks/dict';
import TradeHistory from '../../../../../src/lib/components/tradeHistory';
import { render, screen } from '@testing-library/react';

describe('TradeHistory component', () => {
  it('should render trade history', () => {
    render(<TradeHistory dict={mockDict} locale="en-US" />);

    const container = screen.getByTestId('trade-history-component');
    const ttile = screen.getByText('Trade History');

    expect(container).toBeInTheDocument();
    expect(ttile).toBeInTheDocument();
  });
});
