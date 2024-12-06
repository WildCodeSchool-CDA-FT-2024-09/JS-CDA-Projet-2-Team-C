import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver from './modules/department/department.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RoleResolver, ConsultationResolver, DepartmentResolver],
    validate: true
  });
};

export default getSchema;
