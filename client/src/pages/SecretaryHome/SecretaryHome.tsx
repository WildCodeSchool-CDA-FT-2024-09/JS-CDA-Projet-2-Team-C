import Agenda from '../../components/Agenda/Agenda';

export default function SecretaryHome() {
  return (
    <div className="grid grid-cols-2">
      <section>Formulaire de prise de RDV</section>
      <section>
        <Agenda />
      </section>
    </div>
  );
}
