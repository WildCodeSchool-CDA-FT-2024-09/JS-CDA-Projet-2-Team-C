import RoleSpecificFields from './RoleSpecificFields';
import RoleSelector from './RoleSelector';
import {
  useAddUserMutation,
  useDepartmentsAndGendersAndRolesQuery
} from '../../generated/graphql-types';
import { useCreateUserForm } from './useCreateUserForm';
import { AdminPopupProps, InputError } from './AdminPopup.types';

// problem was that ref is a reserved keyword in HTML, maybe ?
// because we pass the ref as a prop instead of attaching it to the component, react doesn't lose track of the DOM
export default function AdminPopup({ close, dialogRef }: AdminPopupProps) {
  const { data: departmentsAndGendersAndRoles } =
    useDepartmentsAndGendersAndRolesQuery();

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
    }
  };

  return (
    <dialog id="admin-popup" className="modal" role="dialog" ref={dialogRef}>
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
            />
            <RoleSpecificFields
              role={formInputs.role}
              formInputs={formInputs}
              handleInputChange={handleInputChange}
              departments={departmentsAndGendersAndRoles?.departments}
              genders={departmentsAndGendersAndRoles?.genders}
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
}
