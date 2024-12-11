import { useEffect, useState } from 'react';
import roleMap from '../UserList/roleMap';
import {
  useAddUserMutation,
  useDepartmentsQuery,
  useGendersQuery
} from '../../generated/graphql-types';

export const AdminPopup = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { data: departments } = useDepartmentsQuery();
  const { data: genders } = useGendersQuery();
  const [inputError, setInputError] = useState({});

  const [createUser] = useAddUserMutation();

  const emptyFormInputs = {
    role: '',
    name: '',
    firstname: '',
    email: '',
    service: '',
    gender: ''
  };

  const [formInputs, setFormInputs] = useState(emptyFormInputs);

  // fields available by roles
  const rolesInfosAttribution = {
    doctor: ['name', 'firstname', 'email', 'service', 'gender'],
    secretary: ['name', 'firstname', 'email', 'service'],
    agent: ['name', 'firstname', 'email'],
    admin: ['name', 'firstname', 'email']
  };

  // check if an input is visible to a role
  const isVisibleToRole = (field: string) =>
    formInputs.role && rolesInfosAttribution[formInputs.role]?.includes(field);

  // check if every required field for a role is filled
  useEffect(() => {
    if (!formInputs.role) {
      setButtonDisabled(true);
      return;
    }
    const roleInfos = rolesInfosAttribution[formInputs.role];
    const isValid = roleInfos.every((field) => !!formInputs[field]);
    setButtonDisabled(!isValid);
  }, [formInputs]);

  // handle every form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  // create user on form submit
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

      // reset inputs and errors
      setFormInputs(emptyFormInputs);
      setInputError({});

      // TODO: change for a snackbar when available
      alert('User créé avec succès');

      // close popup
      document.getElementById('admin-popup').close();
    } catch (error) {
      setInputError(error);
    }
  };

  return (
    <>
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
          {inputError &&
            inputError?.graphQLErrors?.map((err, index) => (
              <p key={index} className="mt-1 text-center text-sm text-red-500">
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
              <select
                name="role"
                aria-label="Role"
                className="select select-bordered select-sm max-w-xs border-primary"
                value={formInputs.role}
                onChange={handleInputChange}
              >
                <option value="" disabled defaultValue="">
                  Role
                </option>
                {Object.keys(roleMap).map((key, id) => (
                  <option key={id} value={key}>
                    {roleMap[key]}
                  </option>
                ))}
              </select>
              {isVisibleToRole('name') && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-primary">Nom</span>
                    </div>
                    <input
                      type="text"
                      aria-label="Name"
                      className="input input-bordered w-full max-w-xs border-primary"
                      placeholder="Dupont"
                      name="name"
                      value={formInputs.name}
                      onChange={handleInputChange}
                      disabled={!formInputs.role}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-primary">Prénom</span>
                    </div>
                    <input
                      type="text"
                      aria-label="Firstname"
                      className="input input-bordered w-full max-w-xs border-primary"
                      placeholder="Jean"
                      name="firstname"
                      value={formInputs.firstname}
                      onChange={handleInputChange}
                      disabled={!formInputs.role}
                    />
                  </label>
                </>
              )}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-primary">E-mail</span>
                </div>
                <input
                  className="input input-bordered w-full max-w-xs border-primary"
                  placeholder="email@adresse.com"
                  name="email"
                  aria-label="Email"
                  value={formInputs.email}
                  onChange={handleInputChange}
                  disabled={!formInputs.role}
                  type="email"
                  title="Invalid email address"
                />
              </label>
              {isVisibleToRole('service') && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-primary">Service</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs border-primary text-base"
                    name="service"
                    aria-label="Department"
                    value={formInputs.service}
                    onChange={handleInputChange}
                    disabled={!formInputs.role}
                  >
                    <option value="" defaultValue="" disabled>
                      Service
                    </option>
                    {departments?.departments.map((department) => (
                      <option value={department.label} key={department.id}>
                        {department.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {isVisibleToRole('gender') && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-primary">Genre</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs border-primary text-base"
                    name="gender"
                    aria-label="Gender"
                    value={formInputs.gender}
                    onChange={handleInputChange}
                    disabled={!formInputs.role}
                  >
                    <option value="" defaultValue="" disabled>
                      Genre
                    </option>
                    {genders?.genders.map((gender) => (
                      <option value={gender.label} key={gender.id}>
                        {gender.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
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
    </>
  );
};
