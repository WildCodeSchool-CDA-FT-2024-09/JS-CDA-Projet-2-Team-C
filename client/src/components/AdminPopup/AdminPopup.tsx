import React, { forwardRef, useState } from 'react';
import RoleSpecificFields from './RoleSpecificFields';
import RoleSelector from './RoleSelector';
import {
  useAddUserMutation,
  useDepartmentsAndGendersAndRolesQuery
} from '../../generated/graphql-types';
import { useCreateUserForm } from './useCreateUserForm';
import { AdminPopupProps, InputError } from './AdminPopup.types';

const AdminPopup = forwardRef<HTMLDialogElement, AdminPopupProps>(
  ({ close, refetchUsers }, ref) => {
    const { data: departmentsAndGendersAndRoles } =
      useDepartmentsAndGendersAndRolesQuery();

    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        await createUser({
          variables: {
            lastname: formInputs.name,
            firstname: formInputs.firstname,
            departmentLabel: formInputs.service,
            email: formInputs.email,
            roleCode: formInputs.role,
            genderLabel: formInputs.gender
          }
        });
        // Reset inputs and errors
        await refetchUsers();
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
        close();
      } catch (error: unknown) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'graphQLErrors' in error
        ) {
          setInputError(error as InputError);
        } else {
          console.error('Unexpected error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <dialog id="admin-popup" className="modal" role="dialog" ref={ref}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-center text-lg font-bold text-primary">
            Créer un utilisateur
          </h3>
          {inputError?.graphQLErrors?.map((err, i: number) => (
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
                roles={departmentsAndGendersAndRoles?.roles}
                selectedRole={formInputs.role}
                onChange={handleInputChange}
                disabled={loading}
              />
              <RoleSpecificFields
                role={formInputs.role}
                formInputs={formInputs}
                handleInputChange={handleInputChange}
                departments={departmentsAndGendersAndRoles?.departments}
                genders={departmentsAndGendersAndRoles?.genders}
                disabled={loading}
              />
            </section>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="btn btn-md w-5/6 bg-secondary text-white"
            >
              {loading ? 'Chargement...' : 'Ajouter un utilisateur'}
            </button>
          </form>
        </div>
      </dialog>
    );
  }
);

export default AdminPopup;
