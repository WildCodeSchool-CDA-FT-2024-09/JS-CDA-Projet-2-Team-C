import { RoleCode } from '../../generated/graphql-types';

export const roleLandingPages: Record<RoleCode, string> = {
  AGENT: '/rechercher',
  SECRETARY: '/planning',
  DOCTOR: '/planning',
  ADMIN: '/admin'
};
