import { FormInputs } from '../components/AdminPopup/AdminPopup.types';

export const rolesInfosAttribution: Record<string, (keyof FormInputs)[]> = {
  doctor: ['name', 'firstname', 'email', 'service', 'gender'],
  secretary: ['name', 'firstname', 'email', 'service'],
  agent: ['name', 'firstname', 'email'],
  admin: ['name', 'firstname', 'email']
};

export const isVisibleToRole = (
  role: string,
  field: keyof FormInputs
): boolean => !!role && rolesInfosAttribution[role]?.includes(field);
