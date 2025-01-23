import { beforeAll, afterAll } from '@jest/globals';
import dataSource from './src/database/dataSource';
import seed from './src/database/seed.jest';

jest.mock('./src/services/cache/cacheService', () => {
  return {
    get: jest.fn().mockResolvedValue(null), // Simulate no cache hit by default
    set: jest.fn().mockResolvedValue('OK'), // Simulate successful cache set
    expire: jest.fn().mockResolvedValue(true), // Simulate expiry reset
    del: jest.fn().mockResolvedValue(true), // Simulate expiry reset
    connect: jest.fn().mockResolvedValue(undefined) // Simulate successful connection
  };
});

// TODO : seed database
beforeAll(async () => {
  try {
    await dataSource.initialize();
    await seed();
    console.info('in-memory SQLite DB is seeded');
  } catch (error) {
    console.info(error);
  }
});
afterAll(() => dataSource.destroy());
