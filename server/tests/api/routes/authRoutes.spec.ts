import AuthController from '../../../src/api/controllers/authController';
import authRoutes from '../../../src/api/routes/authRoutes';

jest.mock('../../../src/api/controllers/authController', () => ({
  login: jest.fn(),
}));
jest.mock('express', () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
  })),
}));

describe('Auth Routes', () => {
  const router = authRoutes;
  it('should call AuthController.login when POST / route is accessed', () => {
    router.post('/', AuthController.login);
    expect(router.post).toHaveBeenCalledWith('/', AuthController.login);
  });
});
