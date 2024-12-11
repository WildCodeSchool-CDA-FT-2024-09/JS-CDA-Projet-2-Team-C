import { useEffect, useState } from 'react';
import { rolesInfosAttribution } from '../../utils/roles.utils';
import { InputError } from './AdminPopup.types';

export const useCreateUserForm = () => {
  const [formInputs, setFormInputs] = useState({
    role: '',
    name: '',
    firstname: '',
    email: '',
    service: '',
    gender: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputError, setInputError] = useState<InputError>({});

  useEffect(() => {
    if (!formInputs.role) {
      setButtonDisabled(true);
      return;
    }
    const roleInfos = rolesInfosAttribution[formInputs.role];
    const isValid = roleInfos.every((field) => !!formInputs[field]);
    setButtonDisabled(!isValid);
  }, [formInputs]);

  return {
    formInputs,
    setFormInputs,
    buttonDisabled,
    inputError,
    setInputError
  };
};
