import { ChangeEvent } from 'react';

export type FormInputs = {
  role: string;
  name: string;
  firstname: string;
  email: string;
  service: string;
  gender: string;
};

export type AdminPopupProps = {
  close: () => void;
  refetchUsers: () => void;
};

export interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}
//TODO : remove
export interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export interface RoleSpecificFieldsProps {
  role: string;
  formInputs: Record<string, string>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  departments?: { id: number; label: string }[];
  genders?: { id: number; label: string }[];
  disabled: boolean;
}

export interface RoleSelectorProps {
  roles: { id: number; label: string }[];
  selectedRole: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}

export type GraphQLError = {
  message: string;
};

export type InputError = {
  graphQLErrors?: GraphQLError[];
};
