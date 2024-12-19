import Agenda from '../../components/SecretaryUI/Agenda/Agenda';
import DoctorSelector from '../../components/SecretaryUI/DoctorSelector/DoctorSelector';
import FormPanel from '../../components/SecretaryUI/FormPanel/FormPanel';

export default function SecretaryHome() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <section className="rounded-2xl bg-primary-lighter p-4">
        <FormPanel title={'Médecin'}>
          <DoctorSelector handleDoctorSelected={(e) => console.info(e)} />
        </FormPanel>
        <FormPanel title={'Patient'}>partie patient</FormPanel>
        <FormPanel title={'Horaire'}>partie motif</FormPanel>
        <FormPanel title={'Motif'}>partie motif</FormPanel>
      </section>
      <section>
        <Agenda />
      </section>
    </div>
  );
}
