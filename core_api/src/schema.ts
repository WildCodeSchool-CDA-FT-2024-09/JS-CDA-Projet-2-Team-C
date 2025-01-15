import { buildSchema } from 'type-graphql';
import RoleResolver from './modules/role/role.resolver';
import DepartmentResolver from './modules/department/department.resolver';
import ConsultationResolver from './modules/consultation/consultation.resolver';
import PatientResolver from './modules/patient/patient.resolver';
import UserResolver from './modules/user/user.resolver';
import GenderResolver from './modules/gender/gender.resolver';
import AttachmentResolver from './modules/attachment/attachment.resolver';
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
      AttachmentResolver
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
