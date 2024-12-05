import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver from './modules/department/department.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RoleResolver, DepartmentResolver],
    validate: true
  });
};

export default getSchema;
