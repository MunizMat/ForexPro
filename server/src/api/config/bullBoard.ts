import { ExpressAdapter } from '@bull-board/express';
import { tradeQueue } from '../queues/trade';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(tradeQueue.queue)],
  serverAdapter,
});
