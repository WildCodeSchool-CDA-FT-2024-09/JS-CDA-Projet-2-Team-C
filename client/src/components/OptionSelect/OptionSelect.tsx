import { useRolesQuery } from '../../generated/graphql-types';
export default function OptionSelect() {
  const { data: role } = useRolesQuery();

  const roles = role?.roles || [];
  return (
    <>
      <option value="">Roles : tous</option>
      {roles.map((role) => (
        <option key={role.id} value={role.code}>
          Role : {role.label}
        </option>
      ))}
    </>
  );
}
