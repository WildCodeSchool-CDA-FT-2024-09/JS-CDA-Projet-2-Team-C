import { useParams } from 'react-router-dom';
import { useDossierQuery } from '../../generated/graphql-types';
import ConsultationTimeline from '../../components/ConsultationsTimeline/ConsultationsTimeline';

// only for dev
import fakeData from './sampleDossier.json';

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
        <h1>Dossier patient</h1>
        <ConsultationTimeline
          consultations={fakeData.data.dossier.consultations}
        />
      </>
    );
}
