import dotenv from 'dotenv';
dotenv.config();

interface Connection {
  host: string;
  port: number;
  maxRetriesPerRequest: null;
}

const connection: Connection = {
  host: 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
};

export default connection;