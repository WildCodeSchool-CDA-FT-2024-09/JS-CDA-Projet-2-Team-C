import { beforeAll, afterAll } from '@jest/globals';
import dataSource from './src/database/dataSource';
import seed from './src/database/seed.jest';

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
