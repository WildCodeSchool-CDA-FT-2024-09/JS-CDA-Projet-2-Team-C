import { forwardRef } from 'react';

type UpdateUserPopupProps = {
  close: () => void;
  userId?: string;
};

const UpdateUserPopup = forwardRef<HTMLDialogElement, UpdateUserPopupProps>(
  ({ close, userId }, ref) => {
    console.info('update popup user id', userId);
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
