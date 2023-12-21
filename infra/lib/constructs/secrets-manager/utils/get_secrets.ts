/* ------------- External ------------- */
import { SecretValue } from 'aws-cdk-lib';
import { config } from 'dotenv';

/* ------------- Types ------------- */
import { ForexProSecrets } from '../@types';

config();

export const get_secrets = () => {
  const raw_secrets: ForexProSecrets = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    DYNAMO_TABLE_NAME: process.env.DYNAMO_TABLE_NAME || '',
    DYNAMO_URL: process.env.DYNAMO_URL || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
    META_API_ACCOUNT_ID: process.env.META_API_ACCOUNT_ID || '',
    META_API_TOKEN: process.env.META_API_TOKEN || '',
    PORT: process.env.PORT || '',
    SQS_QUEUE_URL: process.env.SQS_QUEUE_URL || '',
  };

  const secrets = Object.entries(raw_secrets).reduce((secrets, current) => {
    const secret_name = current[0];
    const secret_value = current[1];

    return {
      ...secrets,
      [secret_name]: SecretValue.unsafePlainText(secret_value),
    };
  }, {});

  return secrets;
};
