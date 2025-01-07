import { useRef, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce.ts';
import SearchBar from '../../components/shared_components/SearchBar/SearchBar.tsx';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import CreateUserPopup from '../../components/CreateUserPopup/CreateUserPopup.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import UserList from '../../components/UserList/UserList';
import UpdateUserPopup from '../../components/UpdateUserPopup/UpdateUserPopup.tsx';
import { User } from '../../generated/graphql-types.ts';

export default function Admin() {
  // number of users to display per page, 8 chosen to avoid scrolling
  const perPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchByName, setSearchByName] = useState<string>('');
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [role, setRole] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const debouncedSearch = useDebounce<string>(searchByName, 500);

  const createUserDialogRef = useRef<HTMLDialogElement>(null);
  const updateUserDialogRef = useRef<HTMLDialogElement>(null);

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
    setCurrentPage(0);
  };

  const handleRoleChange = (value: string): void => {
    setRole(value === '' ? '' : value.toLocaleLowerCase());
    setCurrentPage(0);
  };

  const handleCreateUserPopupOpen = () => {
    if (createUserDialogRef.current) {
      createUserDialogRef.current.showModal();
    }
  };

  const handleUpdateUserPopupOpen = (user: User) => {
    setSelectedUser(user);
    if (updateUserDialogRef.current) {
      updateUserDialogRef.current.showModal();
    }
  };

  const handleUpdateUserPopupClose = () => {
    if (updateUserDialogRef.current) {
      updateUserDialogRef.current.close();
    }
  };

  const handleCreateUserPopupClose = () => {
    if (createUserDialogRef.current) {
      createUserDialogRef.current.close();
    }
  };

  // Pagination data update function
  const handlePaginationData = (total: number, hasMoreData: boolean) => {
    setTotalPages(Math.ceil(total / perPage)); // Calculating the total number of pages
    setHasMore(hasMoreData); // Indicates if a next page exists
  };

  return (
    <>
      <section className="h-5/6 min-h-3.5 pl-[15vw] pr-[15vw]">
        <section className="flex p-[27px]">
          <CreateUserPopup
            ref={createUserDialogRef}
            close={handleCreateUserPopupClose}
            refetchUsers={() => setCurrentPage(0)}
          />
          <UpdateUserPopup
            ref={updateUserDialogRef}
            user={selectedUser}
            close={handleUpdateUserPopupClose}
          />
          <div className="basis-1/4">{''}</div>
          <h2 className="basis-3/4 text-center font-bold">
            Liste des utilisateurs
          </h2>
          <button
            type="button"
            className="basis-1/4 rounded-lg bg-primary-dark p-2 text-white hover:bg-secondary"
            onClick={handleCreateUserPopupOpen}
          >
            Ajouter un utilisateur
          </button>
        </section>
        <div className="relative h-[75vh] overflow-x-auto rounded-lg border border-primary-dark p-6">
          <SearchBar handleChange={handleChange} />
          <table className="table bg-white">
            <thead>
              <tr className="border-b border-gray-300">
                <th scope="col">
                  <label htmlFor="role">
                    <OptionSelect handleRoleChange={handleRoleChange} />
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
                perPage={perPage}
                role={role}
                debouncedSearch={debouncedSearch}
                onPaginationData={handlePaginationData}
                openUpdateUserPopup={handleUpdateUserPopupOpen}
              />
            </tbody>
          </table>
          <section className="absolute bottom-0 w-[95%] overflow-x-hidden bg-white p-2 text-right">
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
