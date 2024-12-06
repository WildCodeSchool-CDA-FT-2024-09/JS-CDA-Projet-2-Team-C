import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';
import PatientResolver from './modules/patient/patient.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [RoleResolver, ConsultationResolver, PatientResolver],
    validate: true
  });
};

export default getSchema;
