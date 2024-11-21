import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import RoleResolver from './modules/role/role.resolver';
import { dataSource } from './database/dataSource';

dotenv.config();
const { API_PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RoleResolver],
    validate: true
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT as undefined | number }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
