import { Job, Worker } from 'bullmq';

type CompletedCallback = (
  job: Job<any, any, string>,
  result: any,
  prev: string,
) => void;

type FailedCallback = (
  job: Job<any, any, string> | undefined,
  error: Error,
  prev: string,
) => void;

export default class Listeners {
  static completed(worker: Worker, callback: CompletedCallback) {
    console.log('hey');
    worker.on('completed', callback);
  }
  static failed(worker: Worker, callback: FailedCallback) {
    worker.on('failed', callback);
  }
}
