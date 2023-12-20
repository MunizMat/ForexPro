import { Trade, User } from '@prisma/client';
import prismaClient from '../config/prismaClient';
import { IAccountCreation } from '../interfaces/IAccountCreation';
import { INewAccBalances } from '../interfaces/INewAccBalances';
import { ApiError } from '../helpers/ApiErrors';

export default class DatabaseServices {
  static async createUser(user: IAccountCreation, hashedPassword: string) {
    try {
      const newUser = await prismaClient.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw ApiError.handle(error);
    }
  }

  static async getUserAndTradeHistory(email: string) {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: {
        email,
      },
      include: {
        trades: true,
      },
    });
    return user;
  }

  static async updateUserBalanceAndAddTrade(
    user: User,
    { accountBalanceGBP, accountBalanceUSD }: INewAccBalances,
    trade: Omit<Trade, 'id' | 'createdAt'>,
  ) {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        accountBalanceGBP,
        accountBalanceUSD,

        trades: {
          create: trade,
        },
      },
      include: {
        trades: true,
      },
    });
    return updatedUser;
  }
}
