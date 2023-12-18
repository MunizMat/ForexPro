import { SQS } from '@aws-sdk/client-sqs';
import { config } from 'dotenv';

config();

const sqs = new SQS({
  endpoint: process.env.SQS_QUEUE_URL,
});

export default sqs;
