import { FormEvent, forwardRef } from 'react';
import { User } from '../../generated/graphql-types';

type UpdateUserPopupProps = {
  close: (e: FormEvent<HTMLFormElement>) => void;
  user?: User;
};

const UpdateUserPopup = forwardRef<HTMLDialogElement, UpdateUserPopupProps>(
  ({ close, user }, ref) => {
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
          <form
            onSubmit={close}
            className="flex flex-col place-items-center gap-6"
          >
            <section className="mt-12 flex w-5/6 flex-col place-items-center rounded-xl border border-primary py-6">
              {user && <div>{user.firstname}</div>}
            </section>
            <button
              type="submit"
              className="btn btn-md w-5/6 bg-secondary text-white"
            >
              Modifier
            </button>
          </form>
        </div>
      </dialog>
    );
  }
);

export default UpdateUserPopup;
