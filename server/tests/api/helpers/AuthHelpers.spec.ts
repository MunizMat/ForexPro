import AuthHelpers from '../../../src/api/helpers/AuthHelpers';
import UserServices from '../../../src/api/services/userServices';
import UserHelpers from '../../../src/api/helpers/UserHelper';
import { Trade, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/api/services/userServices');
jest.mock('../../../src/api/helpers/UserHelper');

describe('Auth Helper Class', () => {
  describe('verifyUserCredentials method', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'Password123',
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should check user existance and verify password and return user', async () => {
      const mockUser = {
        name: 'Test',
        email: 'test@example.com',
        password: 'hashed-password',
      } as User & {
        trades: Trade[];
      };

      jest
        .spyOn(UserServices, 'checkUserExistence')
        .mockResolvedValueOnce(mockUser);

      const result = await AuthHelpers.verifyUserCredentials(credentials);

      expect(UserHelpers.verifyPasword).toHaveBeenCalledWith(
        credentials.password,
        mockUser.password,
      );
      expect(UserServices.checkUserExistence).toHaveBeenCalledWith(
        credentials.email,
      );

      expect(result).toEqual(mockUser);
    });
  });

  describe('generateToken method', () => {
    it('should call jwt.sign w/correct args', () => {
      const userId = 1;
      const jwtSpy = jest.spyOn(jwt, 'sign');
      AuthHelpers.generateToken(userId);
      expect(jwtSpy).toHaveBeenCalledWith({ userId: 1 }, expect.any(String), {
        expiresIn: '2d',
      });
    });

    it('should generate a JWT token', () => {
      const userId = 1;
      const token = AuthHelpers.generateToken(userId);
      expect(token).toBeDefined();
    });
  });
});
