import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver from './modules/department/department.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';
import PatientResolver from './modules/patient/patient.resolver';
import UserResolver from './modules/user/user.resolver';
import GenderResolver from './modules/gender/gender.resolver';
import ConsultationSubjectResolver from './modules/consultation_subject/consultationSubject.resolver';
import WorkingHoursResolver from './modules/working_hours/workingHours.resolver';
import { ContextType } from './types/ContextType';
import { RoleCode } from './modules/role/role.entity';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      RoleResolver,
      ConsultationResolver,
      PatientResolver,
      DepartmentResolver,
      UserResolver,
      GenderResolver,
      ConsultationSubjectResolver,
      WorkingHoursResolver
    ],
    authChecker: (
      { context }: { context: ContextType },
      roles: RoleCode[]
    ): boolean => {
      const user = context?.user;
      if (roles.length === 0) {
        return false;
      }
      if (!user) {
        return false;
      }
      return roles.includes(user.role.code);
    },
    validate: true
  });
};

export default getSchema;
