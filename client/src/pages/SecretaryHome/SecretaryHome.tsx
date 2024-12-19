import { useEffect, useState } from 'react';
import Agenda from '../../components/secretary_components/Agenda/Agenda';
import DoctorSelector from '../../components/secretary_components/DoctorSelector/DoctorSelector';
import FormPanel from '../../components/secretary_components/FormPanel/FormPanel';
import {
  ConsultationsByDoctorIdQuery,
  useConsultationsByDoctorIdLazyQuery
} from '../../generated/graphql-types';

export default function SecretaryHome() {
  const [doctorId, setDoctorId] = useState<number>(1);
  const [consultations, setConsultations] = useState<
    ConsultationsByDoctorIdQuery['consultationsByDoctorId']
  >([]);
  const [getConsultationsByDoctorId, { data }] =
    useConsultationsByDoctorIdLazyQuery();

  useEffect(() => {
    // the default doctorId is 0
    if (doctorId) {
      getConsultationsByDoctorId({ variables: { doctorId: doctorId } });
      // console.log('fetching consultations', doctorId);
    }
  }, [doctorId, getConsultationsByDoctorId]);

  useEffect(() => {
    if (data) setConsultations(data?.consultationsByDoctorId);
  }, [data, getConsultationsByDoctorId]);

  // console.log(consultations);

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <section className="rounded-2xl bg-primary-lighter p-4">
        <FormPanel title={'Médecin'}>
          <DoctorSelector
            handleDoctorSelected={(doctor) => setDoctorId(doctor.id)}
          />
        </FormPanel>
        <FormPanel title={'Patient'}>partie patient</FormPanel>
        <FormPanel title={'Horaire'}>partie motif</FormPanel>
        <FormPanel title={'Motif'}>partie motif</FormPanel>
      </section>
      <section>
        <Agenda consultations={consultations} />
      </section>
    </div>
  );
}
