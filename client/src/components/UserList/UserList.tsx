import { Link } from 'react-router-dom';
import UserProps from './UserList.types';
import roleMap from './roleMap';
import Modifer from './Modifer.svg';
import Archive from './Archive.svg';

export default function UserList({
  id,
  name,
  lastName,
  email,
  role
}: UserProps) {
  // function for translate role bdd to role french
  const translatedRole = roleMap[role];

  return (
    <tr id={id.toString()} className="border-b border-gray-300">
      <td>{translatedRole ? translatedRole : role}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td className="flex gap-2">
        <Link
          to="/admin"
          className="m-0 inline-flex items-center gap-2 rounded-lg bg-primary-light p-2 hover:bg-primary-dark hover:text-white"
        >
          <Modifer />
          Modifier
        </Link>
        <Link
          to="/admin"
          className="m-0 inline-flex items-center gap-2 rounded-lg bg-danger-lighter p-2 hover:bg-danger-dark hover:text-white"
        >
          <Archive />
          Archiver
        </Link>
      </td>
    </tr>
  );
}
