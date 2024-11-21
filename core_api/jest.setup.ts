import { beforeAll, afterAll } from '@jest/globals';
import { dataSource } from './src/database/dataSource';

beforeAll(async () => await dataSource.initialize());
afterAll(() => dataSource.destroy());
