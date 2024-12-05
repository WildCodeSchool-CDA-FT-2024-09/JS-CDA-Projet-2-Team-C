import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RoleResolver, ConsultationResolver],
    validate: true
  });
};

export default getSchema;
