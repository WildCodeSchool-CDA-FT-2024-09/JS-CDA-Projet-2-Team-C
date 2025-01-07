import { useEffect, useState } from 'react';
import Agenda from '../../components/secretary_components/Agenda/Agenda';
import DoctorSelector from '../../components/secretary_components/DoctorSelector/DoctorSelector';
import FormPanel from '../../components/secretary_components/FormPanel/FormPanel';
import {
  ConsultationsByDoctorIdQuery,
  useConsultationsByDoctorIdLazyQuery
} from '../../generated/graphql-types';
import PatientSelector from '../../components/secretary_components/PatientSelector/PatientSelector';

export default function SecretaryHome() {
  // Doctor
  const [doctorId, setDoctorId] = useState<number>(0);
  const [consultations, setConsultations] = useState<
    ConsultationsByDoctorIdQuery['consultationsByDoctorId']
  >([]);
  const [getConsultationsByDoctorId, { data }] =
    useConsultationsByDoctorIdLazyQuery();

  useEffect(() => {
    if (doctorId) {
      getConsultationsByDoctorId({ variables: { doctorId: doctorId } });
    }
  }, [doctorId, getConsultationsByDoctorId]);

  useEffect(() => {
    if (data) setConsultations(data?.consultationsByDoctorId);
  }, [data, getConsultationsByDoctorId]);

  // Patient
  const [patientId, setPatientId] = useState<number | null>(null);
  const [patientDisplayMode, setPatientDisplayMode] = useState<
    'search' | 'form'
  >('search');

  const handlePatientSelected = (patientId: number) => {
    setPatientId(patientId);
  };

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <section className="rounded-2xl bg-primary-lighter p-4">
        <FormPanel title={'Médecin'}>
          <DoctorSelector
            handleDoctorSelected={(doctor) => setDoctorId(doctor.id)}
          />
        </FormPanel>
        <FormPanel
          title={'Patient'}
          onReturn={
            patientDisplayMode !== 'search'
              ? () => setPatientDisplayMode('search')
              : undefined
          }
        >
          <PatientSelector
            patientId={patientId}
            handlePatientSelected={handlePatientSelected}
            displayMode={patientDisplayMode}
            setDisplayMode={setPatientDisplayMode}
          />
        </FormPanel>
        <FormPanel title={'Horaire'}>partie motif</FormPanel>
        <FormPanel title={'Motif'}>partie motif</FormPanel>
      </section>
      <section>
        <Agenda consultations={consultations} />
      </section>
    </div>
  );
}
