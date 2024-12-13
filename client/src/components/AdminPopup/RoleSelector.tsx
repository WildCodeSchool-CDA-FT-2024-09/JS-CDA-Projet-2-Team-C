import { RoleSelectorProps } from './AdminPopup.types';

const RoleSelector = ({ roles, selectedRole, onChange }: RoleSelectorProps) => (
  <select
    name="role"
    aria-label="Role"
    className="select select-bordered select-sm max-w-xs border-primary"
    value={selectedRole}
    onChange={onChange}
  >
    <option value="" disabled defaultValue="">
      Role
    </option>
    {roles?.map((role, id) => (
      <option key={id} value={role.label.toLowerCase()}>
        {role.label.toLowerCase()}
      </option>
    ))}
  </select>
);

export default RoleSelector;
