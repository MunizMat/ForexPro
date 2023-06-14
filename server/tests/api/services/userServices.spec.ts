import { User, Trade } from '@prisma/client';
import DatabaseServices from '../../../src/api/services/databaseServices';
import UserServices from '../../../src/api/services/userServices';
import { ApiError } from '../../../src/api/helpers/ApiErrors';
import hashPassword from '../../../src/api/helpers/hashPassword';

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

    it('should call api error handler method if an error occurs', async () => {
      const mockError = new Error('some error');

      jest
        .spyOn(UserServices, 'getHashedPassword')
        .mockResolvedValue(mockHashedPassword);

      jest.spyOn(DatabaseServices, 'createUser').mockRejectedValue(mockError);

      try {
        await UserServices.create(userData);
      } catch (error) {}

      expect(ApiError.handle).toHaveBeenCalledWith(mockError);
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
      } catch (error) {}

      expect(ApiError.handle).toHaveBeenCalledWith(mockError);
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

  // describe('checkUserExistence() method', () => {
  //   it('should check user existence', async () => {
  //     await UserServices.checkUserExistence(email);
  //   });
  // });
});
