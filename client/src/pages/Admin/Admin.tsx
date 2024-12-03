import UsereList from '../../components/UserList/UserList';
import UserProps from '../../components/UserList/UserList.types';

const users: UserProps[] = [
  {
    id: 1,
    role: 'médecin',
    name: 'DeTaches',
    lastName: 'Maxime',
    email: 'maxim.detaches@secretaria.com'
  },
  {
    id: 2,
    role: 'agent',
    name: 'DeChoc',
    lastName: 'Alex',
    email: 'alex.dechoc@secretaria.com'
  },
  {
    id: 3,
    role: 'secrétaire',
    name: 'Papier',
    lastName: 'Clara',
    email: 'clara.papier@secretaria.com'
  },
  {
    id: 4,
    role: 'admin',
    name: 'Super',
    lastName: 'Admin',
    email: 'super.admin@secretaria.com'
  },
  {
    id: 5,
    role: 'médecin',
    name: 'Docteur',
    lastName: 'House',
    email: 'docteur.house@secretaria.com'
  },
  {
    id: 6,
    role: 'agent',
    name: 'DeTerrain',
    lastName: 'Luc',
    email: 'luc.deterrain@secretaria.com'
  },
  {
    id: 7,
    role: 'secrétaire',
    name: 'ÀLettre',
    lastName: 'Sophie',
    email: 'sophie.alettre@secretaria.com'
  },
  {
    id: 8,
    role: 'admin',
    name: 'Sys',
    lastName: 'Admin',
    email: 'sys.admin@secretaria.com'
  },
  {
    id: 9,
    role: 'médecin',
    name: 'Cure',
    lastName: 'Jean',
    email: 'jean.cure@secretaria.com'
  },
  {
    id: 10,
    role: 'secrétaire',
    name: "DeL'Agenda",
    lastName: 'Camille',
    email: 'camille.delagenda@secretaria.com'
  }
];

export default function Admin() {
  return (
    <section className="h-5/6 min-h-3.5 pb-[10vh] pl-[15vw] pr-[15vw] pt-[10vh]">
      <section className="flex">
        <h2>Liste des utilisateurs</h2>
        <button type="button">Ajouter un utilisateur </button>
      </section>
      <div className="overflow-x-auto bg-primary-lighter p-20">
        <label htmlFor="role">
          <select name="" id="">
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="secretaire">Sécretaire</option>
            <option value="medecin">Médecin</option>
          </select>
        </label>
        <table className="table bg-white">
          {/* head */}
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
            {users.map((user) => (
              <UsereList
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
        <div className="join">
          <button className="btn join-item">«</button>
          <button className="btn join-item">Page 01</button>
          <button className="btn join-item">»</button>
        </div>
      </div>
    </section>
  );
}
