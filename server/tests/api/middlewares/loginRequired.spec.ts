import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../src/api/helpers/ApiErrors';
import { loginRequired } from '../../../src/api/middlewares/loginRequired';
import dotenv from 'dotenv';
dotenv.config();

const testJwt = process.env.TEST_JWT;
const jwtSecret = process.env.JWT_SECRET_KEY;

describe('Login Required Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer ' + testJwt,
      },
    };
    res = {};
    next = jest.fn();
  });

  it('should call next if a valid token is provided', async () => {
    const verifyMock = jest.spyOn(jwt, 'verify');

    await loginRequired(req as Request, res as Response, next);

    expect(verifyMock).toHaveBeenCalledWith(testJwt, jwtSecret);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next with UnauthorizedError if no token is provided', async () => {
    delete req.headers?.authorization;

    await loginRequired(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(new UnauthorizedError('loginRequired'));
  });

  it('should call next with UnauthorizedError if an invalid or expired token is provided', async () => {
    const verifyMock = jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await loginRequired(req as Request, res as Response, next);

    expect(verifyMock).toHaveBeenCalledWith(testJwt, jwtSecret);
    expect(next).toHaveBeenCalledWith(new UnauthorizedError('unauthorized'));
  });
});
