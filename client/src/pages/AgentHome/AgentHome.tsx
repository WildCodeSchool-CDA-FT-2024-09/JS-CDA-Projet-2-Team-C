import { useState } from 'react';
import {
  useDepartmentsAndDoctorsQuery,
  useGetDoctorByDepartmentQuery
} from '../../generated/graphql-types';
import ViewButtons from '../../components/ViewButton/ViewButtons';
import AgentList from '../../components/AgentList/AgentList';

function DynamicPage() {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const {
    loading: loadingServices,
    error: errorServices,
    data: dataServices
  } = useDepartmentsAndDoctorsQuery();

  const {
    loading: loadingDoctors,
    error: errorDoctors,
    data: dataDoctors
  } = useGetDoctorByDepartmentQuery({
    variables: { label: selectedService || '' },
    skip: !selectedService
  });

  if (loadingServices) return <p>Chargement des services...</p>;
  if (errorServices) return <p>Erreur lors du chargement des services.</p>;

  const handleServiceClick = (label: string) => {
    setSelectedService(label);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    setSelectedService(null);
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      {!selectedView ? (
        // Vue initiale avec les trois boutons
        <ViewButtons
          handleViewChange={handleViewChange}
          buttonLabels={['Service', 'Docteur', 'Patient']}
        />
      ) : selectedView === 'service' ? (
        // Vue pour les services
        <>
          <h1 className="text-3xl font-bold">
            {selectedService
              ? `Docteurs pour ${selectedService}`
              : 'Liste des services'}
          </h1>
          {selectedService ? (
            // Vue pour les docteurs par service
            <>
              {loadingDoctors ? (
                <p>Chargement des docteurs...</p>
              ) : errorDoctors ? (
                <p>Erreur lors du chargement des docteurs.</p>
              ) : (
                <AgentList
                  items={dataDoctors?.getDoctorByDepartment[0]?.users || []}
                  renderItem={(doctor) =>
                    `DR. ${doctor.firstname} ${doctor.lastname}`
                  }
                />
              )}
              <button
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                onClick={handleBackClick}
              >
                Retour aux services
              </button>
            </>
          ) : (
            // Vue pour de tout les services
            <AgentList
              items={dataServices?.departments || []}
              renderItem={(department) => department.label}
              onItemClick={(department) => handleServiceClick(department.label)}
            />
          )}
          <button
            className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
            onClick={() => setSelectedView(null)}
          >
            Retour au menu principal
          </button>
        </>
      ) : selectedView === 'docteur' ? (
        // Vue pour les docteurs
        <>
          <h1 className="text-3xl font-bold">Liste des docteurs</h1>
          {loadingServices ? (
            <p>Chargement des docteurs...</p>
          ) : errorServices ? (
            <p>Erreur lors du chargement des docteurs.</p>
          ) : (
            <AgentList
              items={dataServices?.getDoctors || []}
              renderItem={(doctor) =>
                `DR. ${doctor.firstname} ${doctor.lastname}`
              }
            />
          )}
          <button
            className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
            onClick={() => setSelectedView(null)}
          >
            Retour au menu principal
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">
            {selectedView === 'patient' ? 'Liste des patients' : ''}
          </h1>
          <p>Cette fonctionnalité est en cours de développement.</p>
          <button
            className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
            onClick={() => setSelectedView(null)}
          >
            Retour au menu principal
          </button>
        </>
      )}
    </div>
  );
}

export default DynamicPage;
