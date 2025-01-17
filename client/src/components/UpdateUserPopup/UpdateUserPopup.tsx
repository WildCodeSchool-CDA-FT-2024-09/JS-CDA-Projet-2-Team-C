import { forwardRef, useEffect, useState } from 'react';
import {
  useDepartmentsAndGendersAndRolesQuery,
  User,
  useUpdateUserMutation
} from '../../generated/graphql-types';
import RoleSpecificFields from '../CreateUserPopup/RoleSpecificFields';
import { useToast } from '../../contexts/toasts/useToast';
import { InputError } from '../CreateUserPopup/CreateUserPopup.types';
import { rolesInfosAttribution } from '../../utils/roles.utils';

type UpdateUserPopupProps = {
  close: () => void;
  user?: User;
  refetchUsers: () => void;
};

const UpdateUserPopup = forwardRef<HTMLDialogElement, UpdateUserPopupProps>(
  ({ close, refetchUsers, user }, ref) => {
    const [formInputs, setFormInputs] = useState({
      role: '',
      name: '',
      firstname: '',
      email: '',
      gender: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [inputError, setInputError] = useState<InputError>({});
    const [loading, setLoading] = useState(false);

    const { data: departmentsAndGendersAndRoles } =
      useDepartmentsAndGendersAndRolesQuery();
    const [updateUser] = useUpdateUserMutation();
    const { showToast } = useToast();

    useEffect(() => {
      setFormInputs({
        role: user?.role.code.toLowerCase() || '',
        name: user?.lastname || '',
        firstname: user?.firstname || '',
        email: user?.email || '',
        gender: user?.gender?.label || ''
      });
    }, [user]);

    // This checks if every required input is filled for a specific role
    useEffect(() => {
      if (!user) return;
      // Gets the required fields from user's role
      const roleInfos = rolesInfosAttribution[user.role.code.toLowerCase()];

      // Checks if they are present in the form except for departments
      const isValid = roleInfos.every((field) => {
        if (field === 'service') {
          return true;
        }
        return !!formInputs[field];
      });
      // Enable/disable the button accordingly
      setButtonDisabled(!isValid);
    }, [formInputs]);

    // Gets onchanged field value by its name attribute
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      // Updates form field value
      setFormInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (user) {
          await updateUser({
            variables: {
              id: user.id,
              lastname: formInputs.name,
              firstname: formInputs.firstname,
              email: formInputs.email,
              genderLabel: formInputs.gender
            }
          });
          refetchUsers();
          setFormInputs({
            role: '',
            name: '',
            firstname: '',
            email: '',
            gender: ''
          });
          close();
          showToast('Utilisateur modifié avec succès!', 'success');
        }
      } catch (error: unknown) {
        console.error('Error on update form submit:', error);
        if (
          typeof error === 'object' &&
          error !== null &&
          'graphQLErrors' in error
        ) {
          setInputError(error as InputError);
        } else {
          console.error('Unexpected error on update form submit:', error);
          showToast('Une erreur inattendue est survenue.', 'error');
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
            Modifier un utilisateur
          </h3>
          {inputError?.graphQLErrors?.map((err, i: number) => (
            <p key={i} className="mt-1 text-center text-sm text-red-500">
              {err.message}
            </p>
          ))}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col place-items-center gap-6"
          >
            <section className="mt-12 flex w-5/6 flex-col place-items-center rounded-xl border border-primary py-6">
              {user && (
                <RoleSpecificFields
                  role={user.role.code.toLowerCase()}
                  formInputs={formInputs}
                  handleInputChange={handleInputChange}
                  departments={departmentsAndGendersAndRoles?.departments}
                  genders={departmentsAndGendersAndRoles?.genders}
                  disabled={loading}
                  isUpdate
                />
              )}
            </section>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="h-12 w-5/6 rounded-lg bg-secondary text-white hover:opacity-85"
            >
              {loading ? 'Chargement...' : 'Modifier'}
            </button>
          </form>
        </div>
      </dialog>
    );
  }
);

export default UpdateUserPopup;
