export const AdminPopup = () => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        open modal
      </button>
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
          <section className="flex flex-col place-items-center gap-6">
            <section className="mt-12 flex w-5/6 flex-col place-items-center gap-4 rounded-xl border border-primary py-6">
              <select className="select select-bordered select-sm max-w-xs border-primary">
                <option disabled selected>
                  Role
                </option>
                <option>Admin</option>
                <option>Docteur</option>
                <option>Secrétaire</option>
                <option>Agent</option>
              </select>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs border-primary"
                placeholder="Nom"
              />
              <input
                type="text"
                className="input input-bordered w-full max-w-xs border-primary"
                placeholder="Prénom"
              />
              <input
                type="text"
                className="input input-bordered w-full max-w-xs border-primary"
                placeholder="Email"
              />
              <select className="select select-bordered w-full max-w-xs border-primary">
                <option selected disabled>
                  Service
                </option>
                <option>Oncologie</option>
                <option>Podologie</option>
              </select>{' '}
              <select className="select select-bordered w-full max-w-xs border-primary">
                <option selected disabled>
                  Genre
                </option>
                <option>Féminin</option>
                <option>Masculin</option>
                <option>N/A</option>
              </select>{' '}
            </section>
            <button className="btn btn-md w-5/6 bg-secondary text-white">
              Ajouter un utilisateur
            </button>
          </section>
        </div>
      </dialog>
    </>
  );
};
