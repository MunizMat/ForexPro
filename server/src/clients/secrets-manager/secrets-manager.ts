import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { config } from 'dotenv';

config();

const secrets_manager = new SecretsManager({});

export default secrets_manager;
