import { RoleLabel } from '../../generated/graphql-types';

export const roleMap = {
  AGENT: 'Agent',
  SECRETARY: 'Secrétaire',
  DOCTOR: 'Médecin',
  ADMIN: 'Admin'
};

export default function translateRole(label: RoleLabel): string {
  return roleMap[label as keyof typeof roleMap];
}
