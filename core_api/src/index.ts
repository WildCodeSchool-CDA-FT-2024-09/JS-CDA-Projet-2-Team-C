import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dataSource from './database/dataSource';
import getSchema from './schema';
import { ContextType } from './types/ContextType';
import setCookie from 'set-cookie-parser';
import { verifyToken } from './utils/auth.utils';
import { User } from './modules/entities.index';

dotenv.config();
const { API_PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await getSchema();
  const server = new ApolloServer<ContextType>({
    schema
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT as undefined | number },
    context: async ({ req, res }) => {
      let user = null;
      if (req.headers.cookie) {
        const cookie = setCookie.parse(req.headers.cookie, { map: true });
        const token = cookie?.medagendatoken;
        if (token) {
          // Validate token
          const decoded = verifyToken(token.value);
          if (decoded?.id) {
            // Check if user still exists
            user = await User.findOne({
              where: { id: decoded.id },
              relations: ['role']
            });
          }
        }
      }
      return { req, res, user };
    }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
