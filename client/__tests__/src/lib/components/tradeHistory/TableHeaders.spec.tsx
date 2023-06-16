import { render, screen } from '@testing-library/react';
import TableHeaders from '../../../../../src/lib/components/tradeHistory/TableHeaders';
import mockDict from '../../../../../mocks/dict';

describe('TableHeaders', () => {
  it('should render the table headers', () => {
    render(
      <table>
        <TableHeaders {...mockDict.tradeHistory} />
      </table>
    );

    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Currency Pair')).toBeInTheDocument();
    expect(screen.getByText('Base Currency')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Exchange Rate')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });
});
