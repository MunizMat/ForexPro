import AuthHelpers from '../../../src/api/helpers/AuthHelpers';
import UserServices from '../../../src/api/services/userServices';
import UserHelpers from '../../../src/api/helpers/UserHelper';
import { Trade, User } from '@prisma/client';

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
});
