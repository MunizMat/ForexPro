import { Queue, Job, Worker } from 'bullmq';
import UserServices from '../services/userServices';
import { TradeCreationRequest } from '../types/TradeCreationRequest';
import { UserAndTrade } from '../types/UserAndTrade';
import { socket } from '../..';
import connection from './connection';
import { ApiError } from '../helpers/ApiErrors';

interface ITradeQueue {
  queue: Queue<TradeCreationRequest, UserAndTrade, string>;
  name: string;
  worker: Worker<TradeCreationRequest, UserAndTrade | ApiError, string>;
}

class TradeQueue implements ITradeQueue {
  queue: Queue<TradeCreationRequest, UserAndTrade, string>;
  name: string;
  worker: Worker<TradeCreationRequest, UserAndTrade | ApiError, string>;
  constructor() {
    this.name = 'Trade';
    this.queue = new Queue<TradeCreationRequest, UserAndTrade>(this.name, {
      connection,
    });
    this.worker = new Worker<TradeCreationRequest, UserAndTrade | ApiError>(
      this.name,
      this.processor,
      {
        connection,
      },
    );
    this.setListeners();
  }

  processor = async (job: Job) => {
    try {
      const data = await UserServices.addTrade(job.data);
      return data;
    } catch (error) {
      return error as ApiError;
    }
  };

  setListeners() {
    this.worker.on('completed', this.onCompleted);
    this.worker.on('failed', this.onFailed);
  }

  onCompleted = (job: Job<TradeCreationRequest, UserAndTrade | ApiError>) => {
    if (job.returnvalue instanceof ApiError) return;
    const userId = job.returnvalue?.updatedUser.id as number;
    socket.emitToClient(userId, 'tradeCompleted', job.returnvalue);
  };

  onFailed = (
    job: Job<TradeCreationRequest, UserAndTrade | unknown, string> | undefined,
    error: Error,
  ) => {
    console.log('failed');
    console.log(error);
  };
}

export const tradeQueue = new TradeQueue();
