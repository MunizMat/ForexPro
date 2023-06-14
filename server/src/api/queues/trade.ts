import { Queue, Job, Worker } from 'bullmq';
import UserServices from '../services/userServices';
import { TradeCreationRequest } from '../types/TradeCreationRequest';
import { UserAndTrade } from '../types/UserAndTrade';
import { socket } from '../..';
import connection from './connection';
import { ApiError } from '../helpers/ApiErrors';

export const tradeQueue = new Queue<TradeCreationRequest, UserAndTrade>(
  'Trade',
  {
    connection,
  },
);

export const tradeProcessor = async (job: Job) => {
  try {
    const data = await UserServices.addTrade(job.data);
    return data;
  } catch (error) {
    return error as ApiError;
  }
};

export const tradeWorker = new Worker<
  TradeCreationRequest,
  UserAndTrade | ApiError
>('Trade', tradeProcessor, {
  connection,
});

tradeWorker.on(
  'completed',
  (job: Job<TradeCreationRequest, UserAndTrade | ApiError>) => {
    if (job.returnvalue instanceof ApiError) return;
    const userId = job.returnvalue?.updatedUser.id as number;
    socket.emitToClient(userId, 'tradeCompleted', job.returnvalue);
  },
);

tradeWorker.on(
  'failed',
  (
    job: Job<TradeCreationRequest, UserAndTrade | unknown, string> | undefined,
    error: Error,
  ) => {
    console.log('failed');
    console.log(error);
  },
);
