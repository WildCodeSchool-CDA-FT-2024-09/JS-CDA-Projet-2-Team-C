import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver from './modules/department/department.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';
import PatientResolver from './modules/patient/patient.resolver';
import UserResolver from './modules/user/user.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      RoleResolver,
      ConsultationResolver,
      PatientResolver,
      DepartmentResolver,
      UserResolver
    ],

    validate: true
  });
};

export default getSchema;
