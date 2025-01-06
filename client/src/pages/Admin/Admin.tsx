import { useRef, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce.ts';
import SearchBar from '../../components/SearchBar/SearchBar';
import OptionSelect from '../../components/OptionSelect/OptionSelect';
import AdminPopup from '../../components/AdminPopup/AdminPopup.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import UserList from '../../components/UserList/UserList';
import AdminPopupDoctorHour from '../../components/AdminPopupDoctorHour/AdminPopupDoctorHour.tsx';

export default function Admin() {
  // number of users to display per page, 8 chosen to avoid scrolling
  const perPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchByName, setSearchByName] = useState<string>('');
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const debouncedSearch = useDebounce<string>(searchByName, 500);
  const [role, setRole] = useState<string>('');

  const [checkHourDoctor, setCheckHourDoctor] = useState<boolean>(false);
  console.info('%c⧭', 'color: #73998c', checkHourDoctor);
  const [idDoctor, setIdDoctor] = useState<number>();
  const [nameDoctor, setNameDoctor] = useState<string>();

  // pour ouvrir la modale hour doctor
  const [isHourDoctorModalOpen, setHourDoctorIsModalOpen] = useState(false);

  const handleOpenModal = (id: number, name: string) => {
    setHourDoctorIsModalOpen(true);
    setIdDoctor(id);
    setNameDoctor(name);
  };

  const handleCloseModal = () => {
    setHourDoctorIsModalOpen(false);
  };
  // repasser checkHourDoctor en false après l'avoir utilisé
  // conditionner l'affichage du bouton de recherche des medecins sans horaires
  // crérer la fonction qui va permettre de rechercher les medecins sans horaires
  // créer la modale pour ajouter et modifier les horaires des médecins

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

  // Pagination data update function
  const handlePaginationData = (total: number, hasMoreData: boolean) => {
    setTotalPages(Math.ceil(total / perPage)); // Calculating the total number of pages
    setHasMore(hasMoreData); // Indicates if a next page exists
  };

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
            isOpen={isHourDoctorModalOpen}
            onClose={handleCloseModal}
            idDoctor={idDoctor ?? 0}
            nameDoctor={nameDoctor ?? ''}
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
                handleOpenModal={handleOpenModal}
                currentPage={currentPage}
                perPage={perPage}
                role={role}
                debouncedSearch={debouncedSearch}
                onPaginationData={handlePaginationData}
                setCheckHourDoctor={setCheckHourDoctor}
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
