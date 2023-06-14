import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../helpers/ApiErrors';
import dotenv from 'dotenv';
dotenv.config();

export const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1] ?? '';

  if (!token) return next(new UnauthorizedError('loginRequired'));

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY ?? '');

    next();
  } catch (error) {
    next(new UnauthorizedError('unauthorized'));
  }
};
