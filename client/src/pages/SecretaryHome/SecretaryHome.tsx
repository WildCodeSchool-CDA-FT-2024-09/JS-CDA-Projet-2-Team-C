import { useCallback, useEffect, useState } from 'react';
import Agenda from '../../components/secretary_components/Agenda/Agenda';
import DoctorSelector from '../../components/secretary_components/DoctorSelector/DoctorSelector';
import FormPanel from '../../components/secretary_components/FormPanel/FormPanel';
import {
  ConsultationsByDoctorIdQuery,
  useConsultationsByDoctorIdLazyQuery
} from '../../generated/graphql-types';
import PatientSelector from '../../components/secretary_components/PatientSelector/PatientSelector';
import TimeSelector from '../../components/secretary_components/TimeSelector/TimeSelector';
import { ConsultationDateTime } from './SecretaryHome.types';
import SubjectSelector from '../../components/secretary_components/SubjectSelector/SubjectSelector';

export default function SecretaryHome() {
  // Doctor
  const [doctorId, setDoctorId] = useState<string>('');
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
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patientDisplayMode, setPatientDisplayMode] = useState<
    'search' | 'form'
  >('search');

  const handlePatientSelected = (patientId: string) => {
    setPatientId(patientId);
  };

  useEffect(() => {
    if (patientDisplayMode === 'search') {
      setPatientId(null);
    }
  }, [patientDisplayMode]);

  // TimeSlot
  const [consultationDateTime, setConsultationDateTime] =
    useState<ConsultationDateTime | null>(null);

  //this is the function that triggers when an free slot is selected
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // console.log(start, end);
      setConsultationDateTime({
        consultationDate: start.toString(),
        startTime: start.getTime().toString(),
        durationMinutes: (end.getTime() - start.getTime()) / 60000,
        start: start,
        end: end
      });
    },
    [setConsultationDateTime]
  );

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <section className="flex flex-col gap-2 rounded-2xl bg-primary-lighter p-4">
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
        <FormPanel title={'Horaire'}>
          <TimeSelector consultationDateTime={consultationDateTime} />
        </FormPanel>
        <FormPanel title={'Motif'}>
          <SubjectSelector handleSubjectSelected={() => {}} />
        </FormPanel>
        <div></div>
        <button className="btn" disabled={!doctorId || !patientId}>
          {' '}
          Valider le rendez-vous
        </button>
      </section>
      <section>
        <Agenda
          consultations={consultations}
          newConsultation={consultationDateTime}
          handleSelectSlot={handleSelectSlot}
        />
      </section>
    </div>
  );
}
