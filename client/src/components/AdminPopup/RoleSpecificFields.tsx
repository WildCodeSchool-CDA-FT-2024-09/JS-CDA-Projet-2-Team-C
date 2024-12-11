import { isVisibleToRole } from '../../utils/roles.utils';
import { InputField, SelectField } from './Fields';

export const RoleSelector: React.FC<{
  roles: Record<string, string>;
  selectedRole: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ roles, selectedRole, onChange }) => (
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
    {Object.entries(roles).map(([key, label], id) => (
      <option key={id} value={key}>
        {label}
      </option>
    ))}
  </select>
);

export const RoleSpecificFields = ({
  role,
  formInputs,
  handleInputChange,
  departments,
  genders
}) => {
  const { name, firstname, email, service, gender } = formInputs;

  return (
    <>
      {isVisibleToRole(role, 'name') && (
        <>
          <InputField
            name="name"
            label="Nom"
            placeholder="Dupont"
            value={name}
            onChange={handleInputChange}
            disabled={!role}
          />
          <InputField
            name="firstname"
            label="Prénom"
            placeholder="Jean"
            value={firstname}
            onChange={handleInputChange}
            disabled={!role}
          />
        </>
      )}
      <InputField
        name="email"
        label="E-mail"
        placeholder="email@adresse.com"
        value={email}
        onChange={handleInputChange}
        disabled={!role}
        type="email"
      />
      {isVisibleToRole(role, 'service') && (
        <SelectField
          name="service"
          label="Service"
          options={departments?.departments.map((d) => ({
            value: d.label,
            label: d.label
          }))}
          value={service}
          onChange={handleInputChange}
          disabled={!role}
        />
      )}
      {isVisibleToRole(role, 'gender') && (
        <SelectField
          name="gender"
          label="Genre"
          options={genders?.genders.map((g) => ({
            value: g.label,
            label: g.label
          }))}
          value={gender}
          onChange={handleInputChange}
          disabled={!role}
        />
      )}
    </>
  );
};
