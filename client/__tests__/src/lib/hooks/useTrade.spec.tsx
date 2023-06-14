import { renderHook } from '@testing-library/react';
import useTrade from '../../../../src/lib/hooks/useTrade';
import validateTrade from '../../../../src/lib/validations/validateTrade';
import saveTrade from '../../../../src/lib/services/tradeService';
import mockDict from '../../../../mocks/dict';
import { ITradeCreation } from 'src/lib/interfaces/ITrade';

jest.mock('../../../../src/lib/validations/validateTrade');
jest.mock('../../../../src/lib/services/tradeService');

describe('useTrade hook', () => {
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
    const { result } = renderHook(() => useTrade('GBPUSD', mockDict));
    await result.current.handleTrade(mockTradeData, 1000);

    expect(saveTrade).not.toHaveBeenCalled();
  });

  it('should save trade if validation succeeds', async () => {
    (validateTrade as jest.Mock).mockReturnValueOnce(true);
    (saveTrade as jest.Mock).mockResolvedValue('some error');

    const { result } = renderHook(() => useTrade('GBPUSD', mockDict));
    await result.current.handleTrade(mockTradeData, 1000);

    expect(saveTrade).toHaveBeenCalled();
  });
});
