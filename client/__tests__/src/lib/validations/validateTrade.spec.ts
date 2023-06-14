import validateTrade from '../../../../src/lib/validations/validateTrade';
import getTradeSchema from '../../../../src/lib/validations/tradeSchema';
import { toast } from 'react-toastify';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('validateTrade', () => {
  const mockDict = {
    validations: {
      trade: {
        amount: 'Minimum amount for trading is 10 currency units',
        accountBalance: 'Insufficient account balance',
        required: 'Please insert a trade amount',
      },
    },
  } as IDictionary;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true for a valid trade', () => {
    const tradeAmount = '100';
    const accountBalance = 1000;

    const result = validateTrade(tradeAmount, accountBalance, mockDict);

    expect(result).toBe(true);

    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should return false and show an error toast for an invalid trade amount', () => {
    const tradeAmount = '';
    const accountBalance = 1000;
    const schemaSpy = jest.spyOn(getTradeSchema(mockDict), 'parse');

    const result = validateTrade(tradeAmount, accountBalance, mockDict);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Please insert a trade amount');
    expect(schemaSpy).not.toHaveBeenCalled();
  });

  it('should return false and show error toasts for a trade with validation issues', () => {
    const tradeAmount = '9';
    const accountBalance = 1000;

    const result = validateTrade(tradeAmount, accountBalance, mockDict);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalled();
  });
});
