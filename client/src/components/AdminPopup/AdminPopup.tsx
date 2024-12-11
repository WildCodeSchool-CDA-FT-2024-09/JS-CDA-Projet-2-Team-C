import { useEffect, useState } from 'react';
import roleMap from '../UserList/roleMap';

export const AdminPopup = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [formInputs, setFormInputs] = useState({
    role: '',
    name: '',
    firstName: '',
    email: '',
    service: '',
    genre: ''
  });

  const rolesInfosAttribution = {
    doctor: ['name', 'firstName', 'email', 'service', 'genre'],
    secretary: ['name', 'firstName', 'email', 'service'],
    agent: ['name', 'firstName', 'email'],
    admin: ['name', 'firstName', 'email']
  };

  // check if an input is visible to a role
  const isVisibleToRole = (field: string) =>
    formInputs.role && rolesInfosAttribution[formInputs.role]?.includes(field);

  // check if every required field is filled
  useEffect(() => {
    if (!formInputs.role) {
      setButtonDisabled(true);
      return;
    }
    const roleInfos = rolesInfosAttribution[formInputs.role];
    const isValid = roleInfos.every((field) => !!formInputs[field]);
    setButtonDisabled(!isValid);
  }, [formInputs]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUserButton = () => {
    alert('validé');
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-center text-lg font-bold text-primary">
            Créer un utilisateur
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Empêche la soumission par défaut
              handleCreateUserButton(); // Logique pour ajouter l’utilisateur
            }}
            className="flex flex-col place-items-center gap-6"
          >
            <section className="mt-12 flex w-5/6 flex-col place-items-center rounded-xl border border-primary py-6">
              <select
                name="role"
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
                      className="input input-bordered w-full max-w-xs border-primary"
                      placeholder="Jean"
                      name="firstName"
                      value={formInputs.firstName}
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
                  value={formInputs.email}
                  onChange={handleInputChange}
                  disabled={!formInputs.role}
                  type="email"
                  title="Invalid email address"
                />
              </label>
              {isVisibleToRole('service') && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-primary">Service</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs border-primary text-base"
                      name="service"
                      value={formInputs.service}
                      onChange={handleInputChange}
                      disabled={!formInputs.role}
                    >
                      <option value="" defaultValue="" disabled>
                        Service
                      </option>
                      <option>Oncologie</option>
                      <option>Podologie</option>
                    </select>{' '}
                  </label>
                </>
              )}{' '}
              {isVisibleToRole('genre') && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-primary">Genre</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs border-primary text-base"
                      name="genre"
                      value={formInputs.genre}
                      onChange={handleInputChange}
                      disabled={!formInputs.role}
                    >
                      <option value="" defaultValue="" disabled>
                        Genre
                      </option>
                      <option>Féminin</option>
                      <option>Masculin</option>
                      <option>N/A</option>
                    </select>
                  </label>
                </>
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
