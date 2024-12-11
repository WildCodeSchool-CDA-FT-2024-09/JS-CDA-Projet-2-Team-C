import { useState } from 'react';
import {
  useDepartmentsQuery,
  useGetDoctorByDepartmentQuery
} from '../../generated/graphql-types';

function DynamicPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Query pour récupérer les services
  const {
    loading: loadingServices,
    error: errorServices,
    data: dataServices
  } = useDepartmentsQuery();

  // Query pour récupérer les docteurs d'un service
  const {
    loading: loadingDoctors,
    error: errorDoctors,
    data: dataDoctors
  } = useGetDoctorByDepartmentQuery({
    variables: { label: selectedService || '' },
    skip: !selectedService // Ne pas exécuter tant qu'aucun service n'est sélectionné
  });

  if (loadingServices) return <p>Chargement des services...</p>;
  if (errorServices) return <p>Erreur lors du chargement des services.</p>;

  const handleServiceClick = (label: string) => {
    setSelectedService(label);
  };

  const handleBackClick = () => {
    setSelectedService(null); // Retour à la liste des services
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">
        {selectedService
          ? `Docteurs pour ${selectedService}`
          : 'Liste des services'}
      </h1>

      {selectedService ? (
        <>
          {loadingDoctors ? (
            <p>Chargement des docteurs...</p>
          ) : errorDoctors ? (
            <p>Erreur lors du chargement des docteurs.</p>
          ) : (
            <ul className="flex flex-col items-center gap-4">
              {dataDoctors?.getDoctorByDepartment[0]?.users.map((doctor) => (
                <li
                  key={doctor.id}
                  className="flex h-[60px] w-full max-w-[calc(100%-40px)] cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
                >
                  DR. {doctor.firstname} {doctor.lastname}
                </li>
              ))}
            </ul>
          )}
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleBackClick}
          >
            Retour aux services
          </button>
        </>
      ) : (
        <ul className="flex flex-col items-center gap-4">
          {dataServices?.departments.map((department) => (
            <li
              key={department.id}
              className="flex h-[60px] w-full max-w-[calc(100%-40px)] cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
              onClick={() => handleServiceClick(department.label)}
            >
              {department.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DynamicPage;
