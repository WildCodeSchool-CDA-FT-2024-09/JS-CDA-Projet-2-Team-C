import { usePagination } from '../../utils/pagination/usePagination';
import AdminPopupDoctorHour from '../../components/AdminPopupDoctorHour/AdminPopupDoctorHour';
import { useGetAllUsersQuery } from '../../generated/graphql-types';
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
  const {
    setCurrentPage,
    currentPage,
    totalPages,
    hasMore,
    handleNextPage,
    handlePrevPage,
    updatePaginationData
  } = usePagination(0, perPage);

  const [searchByName, setSearchByName] = useState<string>('');
  const debouncedSearch = useDebounce<string>(searchByName, 500);
  const [role, setRole] = useState<string>('');
  const [doctorState, setDoctorState] = useState({
    id: undefined as string | undefined,
    name: undefined as string | undefined,
    isModalOpen: false
  });

  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const handleUpdate = () => {
    refetch();
  };

  const createUserDialogRef = useRef<HTMLDialogElement>(null);
  const updateUserDialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModalDoctorHour = (id: string, name: string) => {
    setDoctorState({
      id: id,
      name: name,
      isModalOpen: true
    });
  };

  const handleCloseModalDoctorHour = () => {
    setDoctorState((prev) => ({
      ...prev,
      isModalOpen: false
    }));
  };

  const handleChange = (value: string): void => {
    setSearchByName(value.toLowerCase());
    setCurrentPage(0);
  };

  const handleRoleChange = (value: string): void => {
    setRole(value === '' ? '' : value.toLocaleLowerCase());
    setCurrentPage(0);
  };

  // Create and Update popup handlers
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

  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: {
      skip: currentPage * perPage,
      take: perPage,
      roleCode: role || null,
      searchByName: debouncedSearch || null,
      workingHoursEmpty: true
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (fetchedData) => {
      const total = fetchedData?.getAllUsers?.total || 0;
      const hasMoreData = fetchedData?.getAllUsers?.hasMore || false;
      updatePaginationData(total, hasMoreData);
    }
  });

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
            refetchUsers={() => setCurrentPage(0)}
          />

          <AdminPopupDoctorHour
            isOpen={doctorState.isModalOpen}
            onClose={handleCloseModalDoctorHour}
            doctorId={doctorState.id ?? ''}
            nameDoctor={doctorState.name ?? 'Nom inconnu'}
            refetchUsers={() => setCurrentPage(0)}
            onUpdate={handleUpdate}
          />

          <div className="">{''}</div>

          <section className="flex w-48 rounded-lg bg-warning p-2">
            <p className="text-[10px]">
              Certains médecins n'ont pas d'horaires
            </p>
            <button
              type="button"
              className="basis-1/4 rounded-lg bg-danger-lighter p-2 hover:bg-danger-light hover:text-white"
            >
              Afficher
            </button>
          </section>

          <h2 className="flex basis-3/4 place-items-center justify-center text-center font-bold">
            Liste des utilisateurs
          </h2>
          <button
            type="button"
            className="basis-1/4 rounded-lg bg-primary-dark p-2 text-white hover:bg-primary"
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
                users={data?.getAllUsers.users || []}
                loading={loading}
                error={!!error}
                handleOpenModal={handleOpenModalDoctorHour}
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
