import { useNavigate } from 'react-router-dom';
import PatientSearchBar from '../../components/PatientSearchBar/PatientSearchBar';

export default function DossierBrowser() {
  const navigate = useNavigate();

  const handleRedirectToDossier = (patientId: number): void => {
    navigate(`/patient/${patientId}/dossier`);
  };

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4">
      <h1 className="text-center">Rechercher un dossier</h1>
      <p>
        Entrez le nom, le prénom ou le numéro de sécurité sociale d'un patient
      </p>
      <PatientSearchBar handlePatientSelected={handleRedirectToDossier} />
    </div>
  );
}
