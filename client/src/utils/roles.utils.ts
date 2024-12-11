export const rolesInfosAttribution = {
  doctor: ['name', 'firstname', 'email', 'service', 'gender'],
  secretary: ['name', 'firstname', 'email', 'service'],
  agent: ['name', 'firstname', 'email'],
  admin: ['name', 'firstname', 'email']
};

export const isVisibleToRole = (role, field) =>
  role && rolesInfosAttribution[role]?.includes(field);
