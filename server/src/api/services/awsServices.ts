import sqs from '../../clients/sqs';
import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import UserServices from './userServices';
import { ApiError } from '../helpers/ApiErrors';
import Socket from '../socket';

config();

export default class AwsServices {
  static async sendQueueMessage(body: unknown, groupId: string) {
    await sqs.sendMessage({
      MessageBody: JSON.stringify(body),
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageGroupId: groupId,
      MessageDeduplicationId: randomUUID(),
    });
  }

  static async processQueueMessage(socket: Socket) {
    const { Messages } = await sqs.receiveMessage({
      QueueUrl: process.env.SQS_QUEUE_URL,
      MaxNumberOfMessages: 10,
    });

    if (!Messages || !Messages?.length) return;

    Messages.forEach(async ({ Body, ReceiptHandle }) => {
      if (!Body || !ReceiptHandle) return null;

      const data = JSON.parse(Body);

      try {
        const result = await UserServices.addTrade(data);

        if (result instanceof ApiError) throw result;

        const userId = result?.updatedUser?.user_id;

        await sqs.deleteMessage({
          ReceiptHandle,
          QueueUrl: process.env.SQS_QUEUE_URL,
        });

        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5s delay

        socket.emitToClient(userId, 'tradeCompleted', result);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
