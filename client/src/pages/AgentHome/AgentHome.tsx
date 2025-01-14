import { useState } from 'react';
import {
  useDepartmentsAndDoctorsQuery,
  useGetDoctorByDepartmentQuery,
  useRestrictedConsultationsByDoctorIdQuery
} from '../../generated/graphql-types';
import ViewButtons from '../../components/ViewButton/ViewButtons';
import AgentChoiceList from '../../components/AgentChoiceList/AgentChoiceList';
import AgentPatientSearchBar from '../../components/agent_components/AgentPatientSearchBar/AgentPatientSearchBar';

export default function AgentHome() {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

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
  const {
    loading: loadingAppointments,
    error: errorAppointments,
    data: dataAppointments
  } = useRestrictedConsultationsByDoctorIdQuery({
    variables: { doctorId: selectedDoctor || '' },
    skip: !selectedDoctor
  });

  if (loadingServices) return <p>Chargement des services...</p>;

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

  const handleDoctorClick = (doctorId: string) => {
    setSelectedDoctor(doctorId);
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
        onItemClick={(doctor) => handleDoctorClick(doctor.id)}
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
        onItemClick={(doctor) => handleDoctorClick(doctor.id)}
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
      <AgentPatientSearchBar
        handlePatientSelected={function (patientId: number): void {
          console.info(`Patient ID sélectionné  : ${patientId}`);
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

  const renderAppointmentsByDoctor = () => (
    <>
      {/* <h1 className="text-center text-3xl font-bold">
        ID du docteur sélectionné :{' '}
        {selectedDoctor || 'Aucun docteur sélectionné'}
      </h1>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setSelectedDoctor(null)}
      >
        Retour aux docteurs
      </button> */}
      <h1 className="text-center text-3xl font-bold">
        Rendez-vous pour le docteur {selectedDoctor || ''}
      </h1>
      <AgentChoiceList
        isLoading={loadingAppointments}
        error={errorAppointments}
        items={dataAppointments?.restrictedConsultationsByDoctorId || []}
        renderItem={(appointment) => (
          <>
            <div>{appointment.patient.firstname}</div>
            <div>{appointment.doctor.firstname}</div>
            <div>{appointment.startTime}</div>
            <div>{appointment.consultationDate}</div>
          </>
        )}
        emptyMessage="Aucun rendez-vous trouvé."
      />
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setSelectedDoctor(null)}
      >
        Retour aux docteurs
      </button>
    </>
  );

  const renderView = () => {
    switch (selectedView) {
      case 'service':
        return selectedDoctor
          ? renderAppointmentsByDoctor()
          : selectedService
            ? renderDoctorsByService()
            : renderServices();
      case 'docteur':
        return selectedDoctor
          ? renderAppointmentsByDoctor()
          : renderAllDoctors();
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
