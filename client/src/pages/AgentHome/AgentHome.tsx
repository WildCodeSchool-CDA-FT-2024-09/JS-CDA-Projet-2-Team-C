import { useState } from 'react';
import {
  useDepartmentsAndDoctorsQuery,
  useGetDoctorByDepartmentQuery,
  useRestrictedConsultationsQuery
} from '../../generated/graphql-types';
import ViewButtons from '../../components/ViewButton/ViewButtons';
import AgentChoiceList from '../../components/agent_components/AgentChoiceList/AgentChoiceList';
import AgentPatientSearchBar from '../../components/agent_components/AgentPatientSearchBar/AgentPatientSearchBar';
import AgentFooter from '../../components/agent_components/AgentFooter/AgentFooter';

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
    data: dataAppointments,
    refetch: refetchAppointments
  } = useRestrictedConsultationsQuery({
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

  const handleDoctorClick = async (doctorId: string) => {
    await refetchAppointments({ doctorId });
    setSelectedDoctor(doctorId);
  };

  const handleReturn = () => {
    if (selectedDoctor) {
      setSelectedDoctor(null);
    } else if (selectedService) {
      handleBackClick();
    } else if (selectedView) {
      setSelectedView(null);
    }
  };

  const resetAll = () => {
    setSelectedView(null);
    setSelectedService(null);
    setSelectedDoctor(null);
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
        openModalOnItemClick={false}
      />
    </>
  );

  const renderDoctorsByService = () => (
    <>
      <h1 className="text-center text-3xl font-bold">
        Docteurs pour{' '}
        {selectedService ? `le service de ${selectedService}` : 'ce service'}
      </h1>
      <AgentChoiceList
        isLoading={loadingDoctors}
        error={errorDoctors}
        items={dataDoctors?.getDoctorByDepartment[0]?.users || []}
        renderItem={(doctor) => `DR. ${doctor.firstname} ${doctor.lastname}`}
        onItemClick={(doctor) => handleDoctorClick(doctor.id)}
        emptyMessage="Aucun docteur trouvé pour ce service."
        openModalOnItemClick={false}
      />
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
        openModalOnItemClick={false}
      />
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
    </>
  );

  const renderAppointmentsByDoctor = () => (
    <>
      <h1 className="text-center text-3xl font-bold">
        Rendez-vous pour le docteur{' '}
        {dataAppointments?.restrictedConsultations[0]?.doctor?.firstname || ''}
      </h1>
      <AgentChoiceList
        isLoading={loadingAppointments}
        error={errorAppointments}
        items={dataAppointments?.restrictedConsultations || []}
        renderItem={(appointment) => (
          <>
            <div className="px-[2px] text-stone-700">
              {appointment.startTime.slice(0, 5)}
            </div>
            <div className="px-[2px]">{appointment.patient.firstname}</div>
            <div className="px-[2px]">{appointment.patient.lastname}</div>
          </>
        )}
        emptyMessage="Aucun rendez-vous trouvé."
        openModalOnItemClick={true}
      />
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
    <div className="flex flex-col">
      <div className="mt-8 flex flex-col items-center gap-8">
        {renderView()}
      </div>
      <AgentFooter handleReturn={handleReturn} resetView={resetAll} />
    </div>
  );
}
