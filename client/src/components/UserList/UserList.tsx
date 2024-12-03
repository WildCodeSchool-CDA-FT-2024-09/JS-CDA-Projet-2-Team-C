import { Link } from 'react-router-dom';
import UserProps from './UserList.types';

import Archive from './Archive.svg';
import Modifer from './Modifer.svg';

export default function UsereList({
  id,
  name,
  lastName,
  email,
  role
}: UserProps) {
  return (
    <tr id={id.toString()} className="border-b border-gray-300">
      <td>{role}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td className="w-min">
        <Link
          to="/admin"
          className="m-0 inline-flex items-center gap-2 rounded-lg bg-primary-light p-2 hover:bg-primary-dark hover:text-white"
        >
          <Modifer />
          Modifier
        </Link>
      </td>
      <td>
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
