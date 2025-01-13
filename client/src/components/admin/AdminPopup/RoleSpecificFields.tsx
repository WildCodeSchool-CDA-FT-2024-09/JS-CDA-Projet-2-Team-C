import { isVisibleToRole } from '../../utils/roles.utils';
import { SelectField, InputField } from './Fields';
import { RoleSpecificFieldsProps } from './AdminPopup.types';

const RoleSpecificFields = ({
  role,
  formInputs,
  handleInputChange,
  departments,
  genders,
  disabled
}: RoleSpecificFieldsProps) => {
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
            disabled={!role || disabled}
          />
          <InputField
            name="firstname"
            label="Prénom"
            placeholder="Jean"
            value={firstname}
            onChange={handleInputChange}
            disabled={!role || disabled}
          />
        </>
      )}
      <InputField
        name="email"
        label="E-mail"
        placeholder="email@adresse.com"
        value={email}
        onChange={handleInputChange}
        disabled={!role || disabled}
        type="email"
      />
      {isVisibleToRole(role, 'service') && (
        <SelectField
          name="service"
          label="Service"
          options={
            departments?.map((d) => ({
              value: d.label,
              label: d.label
            })) || []
          }
          value={service}
          onChange={handleInputChange}
          disabled={!role || disabled}
        />
      )}
      {isVisibleToRole(role, 'gender') && (
        <SelectField
          name="gender"
          label="Genre"
          options={
            genders?.map((g) => ({
              value: g.label,
              label: g.label
            })) || []
          }
          value={gender}
          onChange={handleInputChange}
          disabled={!role || disabled}
        />
      )}
    </>
  );
};

export default RoleSpecificFields;
