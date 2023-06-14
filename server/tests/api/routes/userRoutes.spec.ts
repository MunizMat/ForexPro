import { Router } from 'express';
import UserController from '../../../src/api/controllers/userContorller';
import { loginRequired } from '../../../src/api/middlewares/loginRequired';
import userRoutes from '../../../src/api/routes/userRoutes';

jest.mock('../../../src/api/controllers/userContorller', () => ({
  createUser: jest.fn(),
  getUserProfile: jest.fn(),
}));
jest.mock('../../../src/api/middlewares/loginRequired', () => ({
  loginRequired: jest.fn(),
}));
jest.mock('express', () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
  })),
}));

describe('User Routes', () => {
  let router: Router;

  beforeEach(() => {
    router = userRoutes;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call user creation route with correct arguments', () => {
    router.post('/', UserController.create);
    expect(router.post).toHaveBeenCalledWith('/', UserController.create);
  });

  test('should call trade adding route with correct arguments', () => {
    router.post('/:userId/trade', loginRequired, UserController.enqueueTrade);
    expect(router.post).toHaveBeenCalledWith(
      '/:userId/trade',
      loginRequired,
      UserController.enqueueTrade,
    );
  });
});
