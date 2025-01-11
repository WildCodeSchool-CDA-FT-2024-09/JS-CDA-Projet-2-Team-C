import { RoleCode } from '../../generated/graphql-types';
import { User } from '../AdminPopupDoctorHour/AdminPopupDoctorHour.types';
import alert from '/images/alert-icon.png';

export default function UserList({
  users,
  loading,
  error,
  handleOpenModal
}: {
  users: User[];
  loading: boolean;
  error: boolean | undefined;
  handleOpenModal: (id: number, name: string) => void;
}) {
  if (loading)
    return (
      <tr>
        <td colSpan={5}>Chargement...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td colSpan={5}>Erreur : Veuillez recharger la page</td>
      </tr>
    );

  const checkWorkingHours = (user: User): JSX.Element | null => {
    if (user.role.code === RoleCode.Doctor) {
      if (user.workingHours && user.workingHours.length === 0) {
        return (
          <>
            <button
              onClick={() =>
                handleOpenModal(user.id, `${user.firstname} ${user.lastname}`)
              }
              type="button"
              className="relative m-0 inline-flex items-center gap-2 rounded-lg bg-[#60DE8C] p-1 hover:bg-[#31B860] hover:text-white"
            >
              Planning
              <img
                src={alert}
                alt="Alerte : Pas d'horaires de travail définis"
                className="absolute right-[-10px] top-[-8px] w-6"
              />
            </button>
          </>
        );
      }

      return (
        <button
          onClick={() =>
            handleOpenModal(user.id, `${user.firstname} ${user.lastname}`)
          }
          type="button"
          className="m-0 inline-flex items-center gap-2 rounded-lg bg-[#60DE8C] p-1 hover:bg-[#31B860] hover:text-white"
        >
          Planning
        </button>
      );
    }
    return null;
  };

  return (
    <>
      {users.map((user) => (
        <tr key={user.id} className="border-b border-gray-300">
          <td>{user.role.label}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td className="relative">{user.email}</td>
          <td className="flex gap-2">
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-primary-light p-2 hover:bg-primary-dark hover:text-white"
            >
              Modifier
            </button>
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-danger-lighter p-2 hover:bg-danger-dark hover:text-white"
            >
              Archiver
            </button>
            {checkWorkingHours(user)}
          </td>
        </tr>
      ))}
    </>
  );
}
