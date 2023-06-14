import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/userServices';
import UserHelpers from '../helpers/UserHelper';
import { IAccountCreation } from '../interfaces/IAccountCreation';
import { User } from '@prisma/client';
import { tradeQueue } from '../queues/trade';
import { TradeCreationRequest } from '../types/TradeCreationRequest';
import { ApiError } from '../helpers/ApiErrors';

export default class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedUser: IAccountCreation =
        UserHelpers.validateForAccountCreation(req.body);

      const user = await UserServices.create(validatedUser);
      return res.status(201).json({
        user: {
          ...(user as User),
          password: '',
        },
      });
    } catch (error) {
      return res.status((error as ApiError).statusCode).json({
        errorTranslationMessage: (error as ApiError).translationReference,
      });
    }
  }

  static async enqueueTrade(req: Request, res: Response, next: NextFunction) {
    const jobData = req.body as TradeCreationRequest;
    try {
      await tradeQueue.add('trade', jobData);
      return res.status(200).json({
        refrenceForTranslation: 'tradeProcessing',
      });
    } catch (error) {
      next(error);
    }
  }
}
