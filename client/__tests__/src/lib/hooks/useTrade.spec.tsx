import { renderHook } from '@testing-library/react';
import useTrade from '../../../../src/lib/hooks/useTrade';
import validateTrade from '../../../../src/lib/validations/validateTrade';
import saveTrade from '../../../../src/lib/services/tradeService';
import mockDict from '../../../../mocks/dict';
import { ITradeCreation } from '../../../../src/lib/interfaces/ITrade';
import { AuthContext } from '../../../../src/lib/contexts/AuthContext';
import { IAuthContextType } from '../../../../src/lib/interfaces/IAuthContextType';
import { ReactNode } from 'react';

jest.mock('../../../../src/lib/validations/validateTrade');
jest.mock('../../../../src/lib/services/tradeService');

describe('useTrade hook', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthContext.Provider
      value={
        {
          authState: {
            user: {
              accountBalanceGBP: 5000,
              accountBalanceUSD: 5000,
            },
            token: 'token',
          },
        } as IAuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockTradeData: Omit<ITradeCreation, 'amount'> = {
    baseCurrency: 'GBP',
    currencyPair: 'GBPUSD',
    exchangeRate: 2,
    tradeType: 'Buy',
  };

  it('should not attempt to save trade if validation fails', async () => {
    (validateTrade as jest.Mock).mockReturnValueOnce(false);
    const { result } = renderHook(() => useTrade('GBPUSD', mockDict), {
      wrapper,
    });
    await result.current.handleTrade(mockTradeData);

    expect(saveTrade).not.toHaveBeenCalled();
  });

  it('should save trade if validation succeeds', async () => {
    (validateTrade as jest.Mock).mockReturnValueOnce(true);
    (saveTrade as jest.Mock).mockResolvedValue('some error');

    const { result } = renderHook(() => useTrade('GBPUSD', mockDict), {
      wrapper,
    });
    await result.current.handleTrade(mockTradeData);

    expect(saveTrade).toHaveBeenCalled();
  });
});
