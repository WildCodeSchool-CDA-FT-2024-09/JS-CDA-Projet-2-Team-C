import { FormEvent, forwardRef, useEffect, useState } from 'react';
import {
  useDepartmentsAndGendersAndRolesQuery,
  User
} from '../../generated/graphql-types';
import RoleSpecificFields from '../CreateUserPopup/RoleSpecificFields';

type UpdateUserPopupProps = {
  close: (e: FormEvent<HTMLFormElement>) => void;
  user?: User;
};

const UpdateUserPopup = forwardRef<HTMLDialogElement, UpdateUserPopupProps>(
  ({ close, user }, ref) => {
    const { data: departmentsAndGendersAndRoles } =
      useDepartmentsAndGendersAndRolesQuery();
    const [formInputs, setFormInputs] = useState({
      role: '',
      name: '',
      firstname: '',
      email: '',
      service: '',
      gender: ''
    });

    useEffect(() => {
      setFormInputs({
        role: user?.role.code.toLowerCase(),
        name: user?.lastname,
        firstname: user?.firstname,
        email: user?.email,
        service: user?.department?.label,
        gender: user?.gender?.label
      });
    }, [user]);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      close();
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
                  disabled={false}
                />
              )}
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
