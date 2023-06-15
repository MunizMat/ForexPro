import AuthService from '../../../src/api/services/authServices';
import AuthHelpers from '../../../src/api/helpers/AuthHelpers';
import { Trade, User } from '@prisma/client';

jest.mock('../../../src/api/helpers/AuthHelpers');

describe('Auth Services Class', () => {
  describe('loginUser method', () => {
    const email = 'test@example.com';
    const password = 'Password123';

    const mockVerifiedUser = {
      id: 1,
      name: 'Test',
      email: 'test@example.com',
      password: 'Password123',
    } as User & {
      trades: Trade[];
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should call auth helper to verify credentials', async () => {
      jest
        .spyOn(AuthHelpers, 'verifyUserCredentials')
        .mockResolvedValueOnce(mockVerifiedUser);

      await AuthService.loginUser(email, password);

      expect(AuthHelpers.verifyUserCredentials).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('should call auth helper to generate token', async () => {
      jest
        .spyOn(AuthHelpers, 'verifyUserCredentials')
        .mockResolvedValue(mockVerifiedUser);

      await AuthService.loginUser(email, password);

      expect(AuthHelpers.generateToken).toHaveBeenCalledWith(1);
    });

    it('should return user and token', async () => {
      const mockVerifiedUser = {
        name: 'Test',
        email: 'test@example.com',
        password: 'Password123',
      } as User & {
        trades: Trade[];
      };

      const expectedResult = {
        user: {
          name: 'Test',
          email: 'test@example.com',
          password: '',
        },
        token: 'token',
      };

      jest
        .spyOn(AuthHelpers, 'verifyUserCredentials')
        .mockResolvedValue(mockVerifiedUser);

      jest.spyOn(AuthHelpers, 'generateToken').mockReturnValue('token');

      const result = await AuthService.loginUser(email, password);

      expect(result).toEqual(expectedResult);
    });
  });
});
