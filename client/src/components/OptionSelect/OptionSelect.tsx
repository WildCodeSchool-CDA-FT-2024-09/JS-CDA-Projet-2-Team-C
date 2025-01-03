import { useRolesQuery } from '../../generated/graphql-types';

export default function OptionSelect({
  handleRoleChange
}: {
  handleRoleChange: (value: string) => void;
}) {
  const { data, loading, error } = useRolesQuery();

  if (loading) {
    return <p className="italic text-gray-500">Chargement des rôles...</p>;
  }

  if (error) {
    return (
      <p className="italic text-red-500">Erreur lors du chargement des rôles</p>
    );
  }

  const roles = data?.roles || [];

  return (
    <select
      id="role"
      className="m-[-10px] rounded-lg border border-primary-dark p-2 focus:outline-none"
      onChange={(e) => handleRoleChange(e.target.value)}
    >
      <option value="">Roles : tous</option>
      {roles.map((role) => (
        <option key={role.id} value={role.code}>
          Role : {role.label}
        </option>
      ))}
    </select>
  );
}
