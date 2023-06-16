import { TradeQueue } from '../../../src/api/queues/trade';
import { Queue, Worker, Job } from 'bullmq';
import UserServices from '../../../src/api/services/userServices';
import connection from '../../../src/api/queues/connection';
import { socket } from '../../../src';
import { TradeCreationRequest } from '../../../src/api/types/TradeCreationRequest';
import { ApiError } from '../../../src/api/helpers/ApiErrors';

jest.mock('../../../src', () => ({
  socket: {
    emit: jest.fn(),
  },
}));
jest.mock('bullmq', () => ({
  Queue: jest.fn(),
  Worker: jest.fn().mockReturnValue({ on: jest.fn() }),
}));

jest.mock('../../../src/api/services/userServices', () => ({
  addTrade: jest.fn(),
}));

describe('TradeQueue Class', () => {
  const tradeQueue = new TradeQueue();

  const mockJob = {
    data: {
      user: {
        id: 1,
      },
      newTrade: {
        baseCurrency: 'GBPUSD',
      },
    },
  } as unknown as Job;

  test('constructor', () => {
    expect(tradeQueue.name).toBe('Trade');
    expect(Worker).toHaveBeenCalledWith('Trade', expect.any(Function), {
      connection,
    });
    expect(Queue).toHaveBeenCalledWith('Trade', { connection });
  });

  test('processor() success', async () => {
    jest.spyOn(UserServices, 'addTrade').mockResolvedValue(mockJob.data);
    const result = await tradeQueue.processor(mockJob);

    expect(result).toEqual(mockJob.data);
  });

  test('processor() failure', async () => {
    jest
      .spyOn(UserServices, 'addTrade')
      .mockRejectedValue(new ApiError('failToGetUserData', 500));

    const result = await tradeQueue.processor(mockJob);

    expect(result).toBeInstanceOf(ApiError);
  });
});
