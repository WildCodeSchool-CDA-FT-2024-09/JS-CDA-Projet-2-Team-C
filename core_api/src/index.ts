import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from './database/dataSource';
import getSchema from './schema';

dotenv.config();
const { API_PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await getSchema();

  const server = new ApolloServer({
    schema
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT as undefined | number }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
