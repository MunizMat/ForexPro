import { User, Trade } from '@prisma/client';
import DatabaseServices from '../../../src/api/services/databaseServices';
import UserServices from '../../../src/api/services/userServices';
import { ApiError } from '../../../src/api/helpers/ApiErrors';
import hashPassword from '../../../src/api/helpers/hashPassword';
import { TradeCreationRequest } from '../../../src/api/types/TradeCreationRequest';
import UserHelpers from '../../../src/api/helpers/UserHelper';

jest.mock('../../../src/api/helpers/ApiErrors');
jest.mock('../../../src/api/helpers/hashPassword');

describe('User Services Class', () => {
  const email = 'test@example.com';
  describe('create() method', () => {
    const userData = {
      name: 'Test',
      email,
      password: 'Password123',
    };

    const mockCreatedUser = {
      id: 1,
      name: 'Test',
      email,
      password: 'hashedPassword',
    } as User;

    const mockHashedPassword = 'hashedPassword';

    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should create a user', async () => {
      const hashPasswordSpy = jest
        .spyOn(UserServices, 'getHashedPassword')
        .mockResolvedValue(mockHashedPassword);

      const dbServicesSpy = jest
        .spyOn(DatabaseServices, 'createUser')
        .mockResolvedValue(mockCreatedUser);

      const result = await UserServices.create(userData);

      expect(hashPasswordSpy).toHaveBeenCalledWith(userData.password);
      expect(dbServicesSpy).toHaveBeenCalledWith(userData, mockHashedPassword);
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('getHashedPassword() method', () => {
    const mockPassword = 'password';
    const mockHashedPassword = 'hashedPassword';

    it('should get a hashed password', async () => {
      (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);

      const result = await UserServices.getHashedPassword(mockPassword);

      expect(hashPassword).toHaveBeenCalledWith(mockPassword);
      expect(result).toBe(mockHashedPassword);
    });

    it('should call api error handler method if an error occurs', async () => {
      const mockError = new Error('some error');
      (hashPassword as jest.Mock).mockRejectedValue(mockError);

      try {
        await UserServices.getHashedPassword(mockPassword);
      } catch (error) {
        expect(ApiError.handle).toHaveBeenCalledWith(mockError);
      }
    });
  });

  describe('getData() method', () => {
    const mockUserData = {
      id: 1,
      name: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
      trades: [],
    } as unknown as User & {
      trades: Trade[];
    };

    it("should get user's data", async () => {
      const dbSpy = jest
        .spyOn(DatabaseServices, 'getUserAndTradeHistory')
        .mockResolvedValue(mockUserData);

      const result = await UserServices.getData(email);

      expect(dbSpy).toHaveBeenCalledWith(email);
      expect(result).toBe(mockUserData);
    });

    it('should call api error handler method if an error occurs', async () => {
      const mockError = new Error('some error');
      jest
        .spyOn(DatabaseServices, 'getUserAndTradeHistory')
        .mockRejectedValue(mockError);

      try {
        await UserServices.getData(email);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toHaveProperty('message');
      }
    });
  });

  describe('addTrade() method', () => {
    test('adding a trade to the user', async () => {
      const mockJobData = {
        user: {
          id: 1,
        },
        newTrade: {},
      } as TradeCreationRequest;

      const mockNewAccBalances = {
        accountBalanceGBP: 5000,
        accountBalanceUSD: 5000,
      };
      const mockUpdatedUser = {
        id: 1,
        accountBalanceGBP: 5000,
      } as User & {
        trades: Trade[];
      };

      jest
        .spyOn(UserHelpers, 'getUpdatedAccountBalance')
        .mockReturnValue(mockNewAccBalances);

      jest
        .spyOn(DatabaseServices, 'updateUserBalanceAndAddTrade')
        .mockResolvedValue(mockUpdatedUser);
      const result = await UserServices.addTrade(mockJobData);

      expect(result).toEqual({
        updatedUser: mockUpdatedUser,
        newTrade: mockJobData.newTrade,
      });
    });
  });

  describe('checkUserExistence() method', () => {
    const mockEmail = 'mock@email';

    test('user exists', async () => {
      const mockUser = { id: 1 } as User & {
        trades: Trade[];
      };

      jest
        .spyOn(DatabaseServices, 'getUserAndTradeHistory')
        .mockResolvedValue(mockUser);

      const result = await UserServices.checkUserExistence(mockEmail);

      expect(result).toBe(mockUser);
    });

    test('user does not exist', async () => {
      jest
        .spyOn(DatabaseServices, 'getUserAndTradeHistory')
        .mockRejectedValue(new Error('someError'));

      try {
        await UserServices.checkUserExistence(mockEmail);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
      }
    });
  });
});
