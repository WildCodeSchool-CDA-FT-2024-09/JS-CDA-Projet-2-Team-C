import { ChangeEvent } from 'react';

export type FormInputs = {
  role: string;
  name: string;
  firstname: string;
  email: string;
  service: string;
  gender: string;
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
  departments?: {
    departments: { id: string; label: string }[];
  };
  genders?: {
    genders: { id: string; label: string }[];
  };
}

export type GraphQLError = {
  message: string;
};

export type InputError = {
  graphQLErrors?: GraphQLError[];
};
