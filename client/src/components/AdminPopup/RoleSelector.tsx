import { RoleSelectorProps } from './AdminPopup.types';

const RoleSelector = ({
  roles,
  selectedRole,
  onChange,
  disabled
}: RoleSelectorProps) => (
  <select
    name="role"
    aria-label="Role"
    className="select select-bordered select-sm max-w-xs border-primary"
    value={selectedRole}
    onChange={onChange}
    disabled={disabled}
  >
    <option value="" disabled defaultValue="">
      Role
    </option>
    {roles?.map((role, id) => (
      <option key={id} value={role.code.toLowerCase()}>
        {role.label.toLowerCase()}
      </option>
    ))}
  </select>
);

export default RoleSelector;
