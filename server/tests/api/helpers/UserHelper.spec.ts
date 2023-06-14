import { IAccountCreation } from '../../../src/api/interfaces/IAccountCreation';
import UserHelpers from '../../../src/api/helpers/UserHelper';
import { ZodValidationError } from '../../../src/api/helpers/ApiErrors';
import TradeHelper from '../../../src/api/helpers/TradeHelper';
import bcrypt from 'bcrypt';

jest.mock('../../../src/api/helpers/TradeHelper');
jest.mock('bcrypt');

describe('UserHelpers', () => {
  const validUser: IAccountCreation = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Password123',
  };

  const invalidUser: IAccountCreation = {
    name: '',
    email: 'invalid-email',
    password: 'password123',
  };

  describe('validateForAccountCreation', () => {
    it('should return the validated user if the user is valid', () => {
      const validatedUser = UserHelpers.validateForAccountCreation(validUser);

      expect(validatedUser).toEqual(validUser);
    });

    it('should throw a ZodValidationError if the user is invalid', () => {
      expect(() =>
        UserHelpers.validateForAccountCreation(invalidUser),
      ).toThrowError(ZodValidationError);
    });

    it('should throw a ZodValidationError with the correct error message and issues if the user is invalid', () => {
      expect.assertions(3);
      try {
        UserHelpers.validateForAccountCreation(invalidUser);
      } catch (error) {
        const zodValidationError = error as ZodValidationError;

        expect(zodValidationError.translationReference).toBe('zodValidation');
        expect(zodValidationError.errors).toBeInstanceOf(Array);
        expect(zodValidationError.errors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getUpdatedAccountBalance method', () => {
    const user = {
      id: 1,
      name: 'Test',
      email: 'test@example.com',
      password: '',
      accountBalanceGBP: 5000,
      accountBalanceUSD: 5000,
    };
    const newTrade = {
      id: 1,
      userId: 1,
      currencyPair: 'GBPUSD',
      baseCurrency: 'GBP',
      tradeType: 'Buy',
      amount: 400,
      exchangeRate: 2,
      createdAt: new Date(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call Trade Helper correctly', () => {
      const mockTradeHelperInstance = {
        getAmounts: jest.fn().mockReturnValue({ amountGBP: 0, amountUSD: 0 }),
      };

      (TradeHelper as jest.Mock).mockReturnValue(mockTradeHelperInstance);

      UserHelpers.getUpdatedAccountBalance(user, newTrade);

      expect(TradeHelper).toHaveBeenCalledWith(newTrade);
      expect(mockTradeHelperInstance.getAmounts).toHaveBeenCalled();
    });

    it('should return updated account balance', () => {
      const mockTradeHelperInstance = {
        getAmounts: jest
          .fn()
          .mockReturnValue({ amountGBP: 400, amountUSD: -200 }),
      };

      const expectedResult = {
        accountBalanceGBP: 5400,
        accountBalanceUSD: 4800,
      };

      (TradeHelper as jest.Mock).mockReturnValue(mockTradeHelperInstance);

      const result = UserHelpers.getUpdatedAccountBalance(user, newTrade);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('verifyPassword method', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const passwordAttempt = 'fake-password';
    const hashedPassword = 'hashed-password';

    it('should call bcrypt.compareSync w/correct arguments', () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      UserHelpers.verifyPasword(passwordAttempt, hashedPassword);

      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        passwordAttempt,
        hashedPassword,
      );
    });

    it('should not throw error if password is correct', () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      expect(() =>
        UserHelpers.verifyPasword(passwordAttempt, hashedPassword),
      ).not.toThrowError();
    });

    it('should throw error if password is incorrect', () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      expect(() =>
        UserHelpers.verifyPasword(passwordAttempt, hashedPassword),
      ).toThrowError();
    });
  });
});
