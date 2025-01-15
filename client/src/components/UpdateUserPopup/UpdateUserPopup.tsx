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
      service: '',
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
        service: user?.department?.label || '',
        gender: user?.gender?.label || ''
      });
    }, [user]);

    useEffect(() => {
      if (!user) return;
      const roleInfos = rolesInfosAttribution[user.role.code.toLowerCase()];
      const isValid = roleInfos.every((field) => !!formInputs[field]);
      setButtonDisabled(!isValid);
    }, [formInputs]);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
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
              departmentLabel: formInputs.service,
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
            service: '',
            gender: ''
          });
          close();
          showToast('Utilisateur modifié avec succès!', 'success');
        }
      } catch (error: unknown) {
        console.error('Erreur capturée:', error);
        if (
          typeof error === 'object' &&
          error !== null &&
          'graphQLErrors' in error
        ) {
          setInputError(error as InputError);
        } else {
          console.error('Erreur inattendue détectée:', error);
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
                />
              )}
            </section>
            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="btn btn-md w-5/6 bg-secondary text-white"
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
