import React from 'react';
import { RoleSelector, RoleSpecificFields } from './RoleSpecificFields';
import roleMap from '../UserList/roleMap';
import {
  useAddUserMutation,
  useDepartmentsQuery,
  useGendersQuery
} from '../../generated/graphql-types';
import { useCreateUserForm } from './useCreateUserForm';

export const AdminPopup: React.FC = () => {
  const { data: departments } = useDepartmentsQuery();
  const { data: genders } = useGendersQuery();
  const [createUser] = useAddUserMutation();
  const {
    formInputs,
    setFormInputs,
    buttonDisabled,
    inputError,
    setInputError
  } = useCreateUserForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: {
          lastname: formInputs.name,
          firstname: formInputs.firstname,
          departmentLabel: formInputs.service,
          email: formInputs.email,
          roleLabel: formInputs.role,
          genderLabel: formInputs.gender
        }
      });
      // Reset inputs and errors
      setFormInputs({
        role: '',
        name: '',
        firstname: '',
        email: '',
        service: '',
        gender: ''
      });
      setInputError({});
      // TODO: replace with a snackbar when available
      alert('User créé avec succès');
      document.getElementById('admin-popup')?.close();
    } catch (error) {
      setInputError(error);
    }
  };

  return (
    <dialog id="admin-popup" className="modal" role="dialog">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-center text-lg font-bold text-primary">
          Créer un utilisateur
        </h3>
        {inputError?.graphQLErrors?.map((err, i) => (
          <p key={i} className="mt-1 text-center text-sm text-red-500">
            {err.message}
          </p>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateUser();
          }}
          className="flex flex-col place-items-center gap-6"
        >
          <section className="mt-12 flex w-5/6 flex-col place-items-center rounded-xl border border-primary py-6">
            <RoleSelector
              roles={roleMap}
              selectedRole={formInputs.role}
              onChange={handleInputChange}
            />
            <RoleSpecificFields
              role={formInputs.role}
              formInputs={formInputs}
              handleInputChange={handleInputChange}
              departments={departments}
              genders={genders}
            />
          </section>
          <button
            type="submit"
            disabled={buttonDisabled}
            className="btn btn-md w-5/6 bg-secondary text-white"
          >
            Ajouter un utilisateur
          </button>
        </form>
      </div>
    </dialog>
  );
};
