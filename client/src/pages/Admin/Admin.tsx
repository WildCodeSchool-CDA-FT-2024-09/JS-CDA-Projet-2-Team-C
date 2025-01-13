import { useRef, useState } from 'react';
import { usePagination } from '../../utils/pagination/usePagination';
import { useDebounce } from '../../utils/useDebounce.ts';
import SearchBar from '../../components/shared_components/SearchBar/SearchBar.tsx';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import AdminPopup from '../../components/AdminPopup/AdminPopup';
import Pagination from '../../components/Pagination/Pagination';
import UserList from '../../components/UserList/UserList';
import AdminPopupDoctorHour from '../../components/AdminPopupDoctorHour/AdminPopupDoctorHour';
import { useGetAllUsersQuery } from '../../generated/graphql-types';
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
    id: undefined as number | undefined,
    name: undefined as string | undefined,
    isModalOpen: false
  });

  const handleUpdate = () => {
    refetch(); // Relancer la requête pour rafraîchir UserList
  };

  const handleOpenModal = (id: number, name: string) => {
    setDoctorState({
      id: id,
      name: name,
      isModalOpen: true
    });
  };

  const handleCloseModal = () => {
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

  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: {
      skip: currentPage * perPage,
      take: perPage,
      roleCode: role || null,
      searchByName: debouncedSearch || null
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
          <AdminPopup
            ref={dialogRef}
            close={handleClose}
            refetchUsers={() => setCurrentPage(0)}
          />

          <AdminPopupDoctorHour
            isOpen={doctorState.isModalOpen}
            onClose={handleCloseModal}
            idDoctor={doctorState.id ?? 0} // 0 comme valeur par défaut si id est undefined
            nameDoctor={doctorState.name ?? 'Nom inconnu'}
            refetchUsers={() => setCurrentPage(0)}
            onUpdate={handleUpdate}
          />

          <div className="">{''}</div>

          <section className="flex w-48 rounded-lg bg-warning p-2">
            <p className="text-[10px]">certain médecins n'ont pas d'horaires</p>
            <button
              type="button"
              className="basis-1/4 rounded-lg bg-danger-lighter p-2 hover:bg-danger-dark hover:text-white"
              onClick={handleOpen}
            >
              afficher
            </button>
          </section>

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
                handleOpenModal={handleOpenModal}
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
