import { Request, Response } from 'express';
import UserHelpers from '../../../src/api/helpers/UserHelper';
import UserServices from '../../../src/api/services/userServices';
import { User } from '@prisma/client';
import { tradeQueue } from '../../../src/api/queues/trade';
import { Job } from 'bullmq';
import UserController from '../../../src/api/controllers/userContorller';

jest.mock('../../../src/api/helpers/UserHelper');
jest.mock('../../../src/api/services/userServices');
jest.mock('../../../src/api/queues/trade', () => ({
  tradeQueue: {
    add: jest.fn(),
  },
}));

describe('User Controller Class', () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create() method', () => {
    const req = {
      body: {
        name: 'Test',
        email: 'test@example.com',
        password: 'Test123456',
      },
    } as Request;

    it('should call validation helper with correct argument', async () => {
      jest.spyOn(UserHelpers, 'validateForAccountCreation');

      await UserController.create(req, res, next);

      expect(UserHelpers.validateForAccountCreation).toHaveBeenCalledWith(
        req.body,
      );
    });

    it('should call creation service with correct argument', async () => {
      const mockValidatedUser = req.body;

      jest.spyOn(UserServices, 'create');
      jest
        .spyOn(UserHelpers, 'validateForAccountCreation')
        .mockReturnValue(mockValidatedUser);

      await UserController.create(req, res, next);

      expect(UserServices.create).toHaveBeenCalledWith(mockValidatedUser);
    });

    it('should respond w/status 201 and user data if creation succeeds', async () => {
      const mockValidatedUser = req.body;
      const mockUser: User = {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        password: 'Test123456',
        accountBalanceGBP: 5000,
        accountBalanceUSD: 5000,
      };

      jest
        .spyOn(UserHelpers, 'validateForAccountCreation')
        .mockReturnValue(mockValidatedUser);
      jest.spyOn(UserServices, 'create').mockResolvedValue(mockUser);

      await UserController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 1,
          name: 'Test',
          email: 'test@example.com',
          password: '',
          accountBalanceGBP: 5000,
          accountBalanceUSD: 5000,
        },
      });
    });

    it('should call next() w/error if an error occurs during creation', async () => {
      jest
        .spyOn(UserServices, 'create')
        .mockRejectedValue(new Error('some error'));

      await UserController.create(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('enqueueTrade() method', () => {
    const req = {
      body: {
        user: {
          id: 1,
          name: 'Test',
          email: 'test@example.com',
          password: '',
          accountBalanceGBP: 5000,
          accountBalanceUSD: 5000,
        },
        newTrade: {
          userId: 1,
          currencyPair: 'GBPUSD',
          baseCurrency: 'GBP',
          tradeType: 'Buy',
          amount: 400,
          exchangeRate: 2,
        },
      },
    } as Request;

    it('should add the trade to the Trades queue', async () => {
      jest.spyOn(tradeQueue, 'add');

      await UserController.enqueueTrade(req, res, next);

      expect(tradeQueue.add).toHaveBeenCalledWith('trade', req.body);
    });

    it('should respond w/status 200 and correct json if trade succeeds', async () => {
      jest.spyOn(tradeQueue, 'add').mockResolvedValue({} as Job);

      await UserController.enqueueTrade(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        refrenceForTranslation: 'tradeProcessing',
      });
    });

    it('should call next() if an error occurs', async () => {
      jest.spyOn(tradeQueue, 'add').mockRejectedValue(new Error('some error'));

      await UserController.enqueueTrade(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
