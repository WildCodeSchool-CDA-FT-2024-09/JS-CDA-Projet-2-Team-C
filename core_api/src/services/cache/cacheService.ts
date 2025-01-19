import * as dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

const cacheClient = createClient({
  url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
});

cacheClient.on('connect', () => {
  console.info('coreapi connected to Redis');
});

cacheClient.on('error', (error) => {
  console.error('coreapi Redis client error:', error);
});

(async () => {
  try {
    await cacheClient.connect();
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
})();

export default cacheClient;
