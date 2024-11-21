import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';

dotenv.config();
const { API_PORT } = process.env;

(async () => {
  //   await dataSource.initialize();
  //   const schema = await buildSchema({
  //     resolvers: [
  //       TeamResolver,
  //       JuryResolver,
  //       UserResolver,
  //       CompetitionResolver,
  //       SessionResolver,
  //     ],
  //     validate: true,
  //   });

  // A schema is a collection of type definitions (hence "typeDefs")

  // that together define the "shape" of queries that are executed against

  // your data.

  const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

  // Resolvers define how to fetch the types defined in your schema.
  // This resolver retrieves books from the "books" array above.
  const resolvers = {
    Query: {
      books: () => books
    }
  };

  const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin'
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster'
    }
  ];

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT as undefined | number }
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
