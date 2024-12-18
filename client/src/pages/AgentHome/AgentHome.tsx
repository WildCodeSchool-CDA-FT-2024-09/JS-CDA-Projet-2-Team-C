import { useState } from 'react';
import {
  useDepartmentsAndDoctorsQuery,
  useGetDoctorByDepartmentQuery
} from '../../generated/graphql-types';
import ViewButtons from '../../components/ViewButton/ViewButtons';
import AgentChoiceList from '../../components/AgentChoiceList/AgentChoiceList';
import PatientSearchBar from '../../components/PatientSearchBar/PatientSearchBar';

export default function AgentHome() {
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

  const renderInitialView = () => (
    <ViewButtons
      handleViewChange={handleViewChange}
      buttonLabels={['Service', 'Docteur', 'Patient']}
    />
  );

  const renderServices = () => (
    <>
      <h1 className="text-center text-3xl font-bold">Liste des services</h1>
      <AgentChoiceList
        isLoading={loadingServices}
        error={errorServices}
        items={dataServices?.departments || []}
        renderItem={(department) => department.label}
        onItemClick={(department) => handleServiceClick(department.label)}
        emptyMessage="Aucun service disponible."
      />
      <button
        className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
        onClick={() => setSelectedView(null)}
      >
        Retour au menu principal
      </button>
    </>
  );

  const renderDoctorsByService = () => (
    <>
      <h1 className="text-center text-3xl font-bold">
        Docteurs pour {selectedService || 'ce service'}
      </h1>
      <AgentChoiceList
        isLoading={loadingDoctors}
        error={errorDoctors}
        items={dataDoctors?.getDoctorByDepartment[0]?.users || []}
        renderItem={(doctor) => `DR. ${doctor.firstname} ${doctor.lastname}`}
        emptyMessage="Aucun docteur trouvé pour ce service."
      />
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={handleBackClick}
      >
        Retour aux services
      </button>
    </>
  );

  const renderAllDoctors = () => (
    <>
      <h1 className="text-center text-3xl font-bold">Liste des docteurs</h1>
      <AgentChoiceList
        isLoading={loadingServices}
        error={errorServices}
        items={dataServices?.getDoctors || []}
        renderItem={(doctor) => `DR. ${doctor.firstname} ${doctor.lastname}`}
        emptyMessage="Aucun docteur disponible."
      />
      <button
        className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
        onClick={() => setSelectedView(null)}
      >
        Retour au menu principal
      </button>
    </>
  );

  const renderPatients = () => (
    <>
      <h1 className="text-center text-3xl font-bold">Liste des patients</h1>

      <PatientSearchBar
        handlePatientSelected={function (patientId: number): void {
          console.info(`Patient ID sélectionné : ${patientId}`);
        }}
      />
      <button
        className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
        onClick={() => setSelectedView(null)}
      >
        Retour au menu principal
      </button>
    </>
  );

  const renderView = () => {
    switch (selectedView) {
      case 'service':
        return selectedService ? renderDoctorsByService() : renderServices();
      case 'docteur':
        return renderAllDoctors();
      case 'patient':
        return renderPatients();
      default:
        return renderInitialView();
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-8">{renderView()}</div>
  );
}
