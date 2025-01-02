import { useCallback, useRef, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce.ts';
import SearchBar from '../../components/SearchBar/SearchBar';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import AdminPopup from '../../components/AdminPopup/AdminPopup.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import UserList from '../../components/UserList/UserList';

export default function Admin() {
  const ITEMS_PER_PAGE = 10; // Nombre d'utilisateurs par page
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [searchByName, setSearchByName] = useState<string>(''); // Recherche
  const [totalPages, setTotalPages] = useState(0); // Total des pages
  const [hasMore, setHasMore] = useState(false); // Si d'autres pages existent
  const debouncedSearch = useDebounce<string>(searchByName, 500); // Recherche avec debounce
  const [role, setRole] = useState<string>(''); // Filtrage par rôle

  // Charge la dernière page
  const loadLastPage = useCallback((totalUsers: number) => {
    const lastPage = Math.max(Math.ceil(totalUsers / ITEMS_PER_PAGE) - 1, 0);
    setCurrentPage(lastPage);
  }, []);

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChange = (value: string): void => {
    setSearchByName(value.toLowerCase());
    setCurrentPage(0); // Réinitialiser la pagination
  };

  const handleRoleChange = useCallback((value: string): void => {
    setRole(value.toLocaleLowerCase());
    setCurrentPage(0); // Réinitialiser la pagination
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // Fonction de mise à jour des données de pagination
  const handlePaginationData = (total: number, hasMoreData: boolean) => {
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE)); // Calcul du nombre total de pages
    setHasMore(hasMoreData); // Indique si une page suivante existe
  };

  return (
    <>
      <section className="h-5/6 min-h-3.5 pl-[15vw] pr-[15vw]">
        <section className="flex p-[27px]">
          <AdminPopup
            ref={dialogRef}
            close={handleClose}
            refetchUsers={() => loadLastPage(totalPages * ITEMS_PER_PAGE)}
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
                      value={role}
                      className="m-[-10px] rounded-lg border border-primary-dark p-2 focus:outline-none"
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
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
              <UserList
                currentPage={currentPage}
                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                role={role}
                debouncedSearch={debouncedSearch}
                onPaginationData={handlePaginationData}
              />
            </tbody>
          </table>
          <section className="w-full text-right">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              hasMore={hasMore}
            />
          </section>
        </div>
      </section>
    </>
  );
}
