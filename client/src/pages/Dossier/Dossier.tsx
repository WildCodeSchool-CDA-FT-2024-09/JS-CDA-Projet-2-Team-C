import { useParams } from 'react-router-dom';
import { useDossierQuery } from '../../generated/graphql-types';
import ConsultationTimeline from '../../components/ConsultationsTimeline/ConsultationsTimeline';
import PatientDetails from '../../components/PatientDetails/PatientDetails';

export default function Dossier() {
  const { patientId } = useParams() as { patientId: string };

  const { data, loading, error } = useDossierQuery({
    variables: { patientId: parseInt(patientId) }
  });

  if (loading) return <h1>Chargement ...</h1>;

  if (error) return <h1>Erreur</h1>;

  if (data)
    return (
      <>
        <section className="mb-8 mt-8 grid grid-cols-2 gap-8">
          <p>zone de recherche</p>
          <PatientDetails patientId={parseInt(patientId)} />
        </section>
        <ConsultationTimeline consultations={data.dossier} />
      </>
    );
}
