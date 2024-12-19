import { useRef, useState } from 'react';
import { useGetAllUsersQuery } from '../../generated/graphql-types';
import UserList from '../../components/UserList/UserList';
import SearchBar from '../../components/SearchBar/SearchBar';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import AdminPopup from '../../components/AdminPopup/AdminPopup.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';

export default function Admin() {
  const ITEMS_PER_PAGE = 10; // Nombre d'utilisateurs par page
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [searchByName, setSearchByName] = useState<string>(''); // Recherche
  // TODO : check role type (use enum on graphql-type) ?
  const [role, setRole] = useState<string>(''); // Filtrage par rôle

  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: {
      skip: currentPage * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      roleCode: role || null, // Filtrer par rôle (null = tous les rôles)
      searchByName: searchByName || null // Recherche (null = pas de filtre)
    },
    fetchPolicy: 'cache-and-network'
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleNextPage = () => {
    if (data?.getAllUsers.hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChange = (value: string): void => {
    setSearchByName(value);
    setCurrentPage(0); // Réinitialiser à la première page
  };

  const handleRoleChange = (value: string): void => {
    setRole(value);
    setCurrentPage(0); // Réinitialiser à la première page
  };

  const handleOpen = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  // const filteredUsers =
  //   data?.users?.filter(
  //     (user) =>
  //       user.role.code.toLowerCase().includes(role.toLowerCase()) &&
  //       (user.firstname.toLowerCase().includes(searchByName.toLowerCase()) ||
  //         user.lastname.toLowerCase().includes(searchByName.toLowerCase()))
  //   ) || [];

  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>Erreur : Veuillez recharger la page</h1>;

  const totalPages = Math.ceil(
    (data?.getAllUsers?.total || 1) / ITEMS_PER_PAGE
  );

  // See https://daisyui.com/components/table/ for table component
  return (
    <>
      <section className="h-5/6 min-h-3.5 pl-[15vw] pr-[15vw]">
        <section className="flex p-[27px]">
          <AdminPopup
            ref={dialogRef}
            close={handleClose}
            refetchUsers={refetch}
          />
          <div className="basis-1/4">{''}</div>
          <h2 className="basis-3/4 text-center font-bold">
            Liste des utilisateurs
          </h2>
          <button
            type="button"
            className="basis-1/4 rounded-lg bg-primary-dark p-2 text-white hover:bg-secondary"
            onClick={handleOpen}
          >
            Ajouter un utilisateur
          </button>
        </section>
        <div className="overflow-x-auto rounded-lg border border-primary-dark p-6">
          <SearchBar handleChange={handleChange} />
          <table className="table bg-white">
            <thead>
              <tr className="border-b border-gray-300">
                <th scope="col">
                  <label htmlFor="role">
                    <select
                      id="role"
                      className="m-[-10px] rounded-lg border border-primary-dark p-2 focus:outline-none"
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <option value="">Roles : tous</option>
                      <OptionSelect />
                    </select>
                  </label>
                </th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">E-mail</th>
                <th scope="col" className="w-28">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <UserList users={data?.getAllUsers.users || []} />
            </tbody>
          </table>
          <section className="w-full text-right">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              hasMore={data?.getAllUsers.hasMore || false}
            />
          </section>
        </div>
      </section>
    </>
  );
}
