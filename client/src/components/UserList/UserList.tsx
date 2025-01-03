import { GetAllUsersQuery } from '../../generated/graphql-types';
import EditIcon from '../../icons/EditIcon';
import ArchiveIcon from '../../icons/ArchiveIcon';

export default function UserList({
  filteredUsers
}: {
  filteredUsers: GetAllUsersQuery['users'];
}) {
  return (
    <>
      {filteredUsers.map((user) => (
        <tr
          key={user.id}
          id={user.id.toString()}
          className="border-b border-gray-300"
        >
          <td>{user.role.label}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td className="flex gap-2">
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-primary-light p-2 hover:bg-primary-dark hover:text-white"
            >
              <EditIcon />
              Modifier
            </button>
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-danger-lighter p-2 hover:bg-danger-dark hover:text-white"
            >
              <ArchiveIcon />
              Archiver
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
