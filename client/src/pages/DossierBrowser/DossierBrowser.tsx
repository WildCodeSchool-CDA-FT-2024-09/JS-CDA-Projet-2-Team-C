import PatientSearchBar from '../../components/PatientSearchBar/PatientSearchBar';

export default function DossierBrowser() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4">
      <h1 className="text-center">Rechercher un dossier</h1>
      <p>Entrez le prénom ou le nom d'un patient</p>
      <PatientSearchBar
        handlePatientSelected={(patientId) => console.info(patientId)}
      />
    </div>
  );
}
