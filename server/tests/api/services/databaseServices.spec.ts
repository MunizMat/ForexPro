import DatabaseServices from '../../../src/api/services/databaseServices';
import prismaClient from '../../../src/api/config/prismaClient';
import { Trade, User } from '@prisma/client';
import { INewAccBalances } from '../../../src/api/interfaces/INewAccBalances';

jest.mock('../../../src/api/config/prismaClient', () => ({
  user: {
    create: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
}));

describe('Database Services Class', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('createUser method', () => {
    it('should call prisma client  w/correct data and return user', async () => {
      const user = {
        name: 'Test',
        email: 'test@example.com',
        password: 'Password123',
      };
      const hashedPassword = 'hashed-password';

      const mockCreateUser = {
        ...user,
        password: hashedPassword,
      } as unknown as User;

      jest.spyOn(prismaClient.user, 'create').mockResolvedValue(mockCreateUser);

      const result = await DatabaseServices.createUser(user, hashedPassword);

      expect(result).toEqual({
        name: 'Test',
        email: 'test@example.com',
        password: 'hashed-password',
      });
    });
  });

  describe('getUserAndTradeHistory method', () => {
    it('should call prisma client  w/correct data', async () => {
      const email = 'test@example.com';

      const prismaSpy = jest.spyOn(prismaClient.user, 'findUniqueOrThrow');

      await DatabaseServices.getUserAndTradeHistory(email);

      expect(prismaSpy).toHaveBeenCalledWith({
        where: {
          email: 'test@example.com',
        },
        include: {
          trades: true,
        },
      });
    });
  });

  describe('updateUserBalanceAndAddTrade method', () => {
    const user = {
      id: 1,
      name: 'Test',
      email: 'test@example.com',
    } as User;

    const newAccBalances: INewAccBalances = {
      accountBalanceGBP: 2000,
      accountBalanceUSD: 2000,
    };

    const trade = {
      userId: 1,
      currencyPair: 'GBPUSD',
      baseCurrency: 'GBP',
      tradeType: 'Buy',
      amount: 400,
      exchangeRate: 2,
    } as Trade;

    it('should call prisma client create w/correct data', async () => {
      const prismaSpy = jest.spyOn(prismaClient.user, 'update');

      await DatabaseServices.updateUserBalanceAndAddTrade(
        user,
        newAccBalances,
        trade,
      );

      expect(prismaSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          accountBalanceGBP: 2000,
          accountBalanceUSD: 2000,

          trades: {
            create: trade,
          },
        },
        include: {
          trades: true,
        },
      });
    });
  });
});
