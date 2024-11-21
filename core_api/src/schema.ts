import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RoleResolver],
    validate: true
  });
};

export default getSchema;
