import { ZodError } from 'zod';
import { IAccountCreation } from '../interfaces/IAccountCreation';
import userSchema from '../validations/userSchema';
import { ApiError, ZodValidationError } from './ApiErrors';
import { Trade, User } from '@prisma/client';
import TradeHelper from './TradeHelper';
import bcrypt from 'bcrypt';

class UserHelpers {
  static validateForAccountCreation(userData: IAccountCreation) {
    try {
      return userSchema.parse(userData);
    } catch (error) {
      const zodError = error as ZodError;
      throw new ZodValidationError('zodValidation', zodError.issues);
    }
  }

  static getUpdatedAccountBalance(
    user: User,
    trade: Omit<Trade, 'id' | 'createdAt'>,
  ) {
    const { amountGBP, amountUSD } = new TradeHelper(trade).getAmounts();
    return {
      accountBalanceGBP: (user.accountBalanceGBP += amountGBP),
      accountBalanceUSD: (user.accountBalanceUSD += amountUSD),
    };
  }

  static verifyPasword(passwordAttempt: string, truePassword: string) {
    const passwordIsCorrect = bcrypt.compareSync(passwordAttempt, truePassword);

    if (!passwordIsCorrect) throw new ApiError('wrongPassword', 400);
  }
}

export default UserHelpers;
