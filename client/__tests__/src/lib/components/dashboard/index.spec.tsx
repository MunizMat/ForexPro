import { render, screen } from '@testing-library/react';
import Dashboard from '../../../../../src/lib/components/dashboard';
import mockDict from '../../../../../mocks/dict';
import Trade from '../../../../../src/lib/components/dashboard/Trade';

jest.mock('../../../../../src/lib/components/dashboard/Trade');

describe('Dashboard component', () => {
  it('should render the dashboard', () => {
    render(
      <Dashboard
        locale="en-US"
        dict={mockDict}
        currencyPair="GBPUSD"
        baseCurrency="GBP"
      />
    );
    expect(screen.getByTestId('trading-image')).toBeInTheDocument();
    expect(screen.getByText('GBPUSD')).toBeInTheDocument();
  });
});
