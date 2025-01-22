import Agenda from '../../components/shared_components/Agenda/Agenda';
import { useAuth } from '../../contexts/auth/useAuth';
import { useConsultationsByDoctorIdQuery } from '../../generated/graphql-types';

export default function DoctorHome() {
  const { user } = useAuth();
  const { loading, data, error } = useConsultationsByDoctorIdQuery({
    variables: { doctorId: user!.id } // we're sure that user isn't null because we checked auth before
  });
  if (loading) return <p>Chargement de votre planning ...</p>;
  if (error) return <p>Erreur dans la récupération du plaaning</p>;
  if (data)
    return (
      <Agenda
        consultations={data?.consultationsByDoctorId}
        className="mt-8 h-[80vh] w-full"
      />
    );
}
