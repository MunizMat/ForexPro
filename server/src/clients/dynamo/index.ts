import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { config } from 'dotenv';

config();

const dynamo = new DynamoDB({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMO_URL,
});

export const dynamo_document = DynamoDBDocument.from(dynamo);

export default dynamo;
