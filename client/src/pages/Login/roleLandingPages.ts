import { RoleLabel } from '../../generated/graphql-types';

export const roleLandingPages: Record<RoleLabel, string> = {
  AGENT: '/rechercher',
  SECRETARY: '/planning',
  DOCTOR: '/planning',
  ADMIN: '/admin'
};
