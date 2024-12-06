import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver, {
  DoctorByDepartmentResolver
} from './modules/department/department.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      RoleResolver,
      ConsultationResolver,
      DepartmentResolver,
      DoctorByDepartmentResolver
    ],
    validate: true
  });
};

export default getSchema;
