import UserList from '../../components/UserList/UserList';
import SearchBar from '../../components/SearchBar/SearchBar';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import users from './fakeUsers';
import { useState } from 'react';

export default function Admin() {
  const [searchByName, setSearchByName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleChange = (value: string): void => {
    setSearchByName(value);
  };

  // function for user's role filter
  const filteredByRole = users.filter((user) =>
    user.role.toLowerCase().includes(role.toLowerCase())
  );

  // function for user's name filter
  const filteredUsers = filteredByRole.filter(
    (user) =>
      user.name.toLowerCase().includes(searchByName.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchByName.toLowerCase())
  );

  return (
    <>
      <section className="h-5/6 min-h-3.5 pb-[10vh] pl-[15vw] pr-[15vw] pt-[10vh]">
        <section className="mb-8">
          <button
            type="button"
            className="absolute right-80 rounded-lg bg-primary-dark p-2 text-white hover:bg-secondary"
          >
            Ajouter un utilisateur
          </button>
          <h2 className="text-center font-bold">Liste des utilisateurs</h2>
        </section>

        <div className="overflow-x-auto rounded-lg border border-primary-dark p-6">
          <SearchBar handleChange={handleChange} />
          <label htmlFor="role">
            <select
              name=""
              id=""
              className="rounded-lg border border-primary-dark p-2 focus:outline-none"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setRole(e.target.value)
              }
            >
              <option value="">Tout les roles</option>
              <OptionSelect />
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="secretaire">Secrétaire</option>
              <option value="medecin">Médecin</option>
            </select>
          </label>
          <table className="table bg-white">
            <thead>
              <tr className="border-b border-gray-300">
                <th>Role</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th className="w-28">Modifier</th>
                <th className="w-28">Archiver</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserList
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  lastName={user.lastName}
                  email={user.email}
                  role={user.role}
                />
              ))}
            </tbody>
          </table>
          <section className="w-full text-right">
            <div className="join">
              <button className="btn join-item">«</button>
              <button className="btn join-item">Page 01</button>
              <button className="btn join-item">»</button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
