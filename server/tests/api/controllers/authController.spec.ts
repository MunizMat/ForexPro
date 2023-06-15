import { Request, Response } from 'express';
import AuthController from '../../../src/api/controllers/authController';
import AuthService from '../../../src/api/services/authServices';
import { ApiError } from '../../../src/api/helpers/ApiErrors';

jest.mock('../../../src/api/services/authServices');

describe('Auth Controller', () => {
  const req = {
    body: {
      email: 'test@example.com',
      password: 'Test123456',
    },
  } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call login service with correct arguments', async () => {
    const loginSpy = jest.spyOn(AuthService, 'loginUser');

    await AuthController.login(req, res);

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledWith(req.body.email, req.body.password);
  });

  it('should call response status and json with correct parameters', async () => {
    const mockUser = {
      password: 'Test123456',
      id: 1,
      name: 'John',
      email: 'john@example.com',
      accountBalanceGBP: 5000,
      accountBalanceUSD: 5000,
      trades: [],
    };

    const mockToken = 'mock-token';
    jest
      .spyOn(AuthService, 'loginUser')
      .mockResolvedValue({ user: mockUser, token: mockToken });
    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: mockUser, token: mockToken });
  });

  test('if an error occurs', async () => {
    jest
      .spyOn(AuthService, 'loginUser')
      .mockRejectedValue(new ApiError('unauthorized', 401));

    await AuthController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      errorTranslationMessage: 'unauthorized',
    });
  });
});
