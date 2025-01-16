import { useCallback, useEffect, useState } from 'react';
import Agenda from '../../components/secretary_components/Agenda/Agenda';
import FormPanel from '../../components/secretary_components/FormPanel/FormPanel';
import DoctorSelector from '../../components/secretary_components/DoctorSelector/DoctorSelector';
import PatientSelector from '../../components/secretary_components/PatientSelector/PatientSelector';
import TimeSelector from '../../components/secretary_components/TimeSelector/TimeSelector';
import SubjectSelector from '../../components/secretary_components/SubjectSelector/SubjectSelector';
import {
  ConsultationsByDoctorIdQuery,
  useConsultationsByDoctorIdLazyQuery,
  useCreateConsultationMutation
} from '../../generated/graphql-types';
import { ConsultationDateTime } from './SecretaryHome.types';

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

  // TimeSlot (agenda selection of consultation date and time)
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

  // Subject & Description, named "details" here
  const [details, setDetails] = useState<Record<string, string> | null>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetails = { ...details, description: e.target.value };
    setDetails(newDetails);
  };

  const handleSubjectSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDetails = { ...details, subject: e.target.value };
    setDetails(newDetails);
  };

  // Submit
  const [createConsultation] = useCreateConsultationMutation();

  const handleSubmit = async () => {
    try {
      if (!doctorId || !patientId || !details || !consultationDateTime) {
        // TODO : show a popup here
        throw new Error('Missing data');
      }

      createConsultation({
        variables: {
          description: details?.description,
          end: consultationDateTime.end,
          start: consultationDateTime.start,
          doctorId: doctorId,
          patientId: patientId,
          subjectLabel: details.subject
        }
      });
    } catch {
      //TODO : show popup
    }
  };

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
          <SubjectSelector
            handleSubjectSelected={handleSubjectSelected}
            details={details}
            handleDescriptionChange={handleDescriptionChange}
          />
        </FormPanel>
        <button
          className="btn"
          disabled={
            !doctorId || !patientId || !details || !consultationDateTime
          }
          onClick={handleSubmit}
        >
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
