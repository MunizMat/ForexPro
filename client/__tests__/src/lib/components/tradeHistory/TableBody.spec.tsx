import { render, screen } from '@testing-library/react';
import TableBody from '../../../../../src/lib/components/tradeHistory/TableBody';
import mockDict from '../../../../../mocks/dict';
import { AuthContext } from '../../../../../src/lib/contexts/AuthContext';
import { IAuthContextType } from '../../../../../src/lib/interfaces/IAuthContextType';

describe('TableBody', () => {
  it('should not render table rows if user is null', () => {
    render(
      <AuthContext.Provider
        value={
          {
            authState: { user: null, isAuthenticated: false, token: null },
          } as IAuthContextType
        }
      >
        <table>
          <TableBody locale="en-US" dict={mockDict} />
        </table>
      </AuthContext.Provider>
    );

    expect(screen.queryByText('GBPUSD')).not.toBeInTheDocument();
  });
});
