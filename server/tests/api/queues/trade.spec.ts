import { Queue } from 'bullmq';
import {
  tradeProcessor,
  tradeQueue,
  tradeWorker,
} from '../../../src/api/queues/trade';

jest.mock('../../../src/index');

describe('Trade Queue', () => {
  test('tradeQueue', () => {
    expect(tradeQueue).toBeInstanceOf(Queue);
  });
});
