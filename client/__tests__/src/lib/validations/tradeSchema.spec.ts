import { IDictionary } from 'src/lib/interfaces/IDictionary';
import getTradeSchema from '../../../../src/lib/validations/tradeSchema';

describe('getTradeSchema', () => {
  const mockDict = {
    validations: {
      trade: {
        amount: 'Minimum amount for trading is 10 currency units',
        accountBalance: 'Insufficient account balance',
      },
    },
  } as IDictionary;

  it('should validate a valid trade', () => {
    const validTrade = {
      amount: 50,
      accountBalance: 100,
    };

    const validationResult = getTradeSchema(mockDict).safeParse(validTrade);

    expect(validationResult.success).toBe(true);
  });

  it('should return validation errors for an invalid trade with amount less than 10', () => {
    const invalidTrade = {
      amount: 5,
      accountBalance: 100,
    };

    const validationResult = getTradeSchema(mockDict).safeParse(invalidTrade);

    expect(validationResult.success).toBe(false);
  });

  it('should return validation errors for an invalid trade with insufficient account balance', () => {
    const invalidTrade = {
      amount: 100,
      accountBalance: 50,
    };

    const validationResult = getTradeSchema(mockDict).safeParse(invalidTrade);

    expect(validationResult.success).toBe(false);
  });
});
