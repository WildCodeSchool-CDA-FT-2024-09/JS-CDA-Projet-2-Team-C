export default interface PatientSelectorProps {
  handlePatientSelected: (patientId: string) => void;
  patientId: string | null;
  displayMode: 'search' | 'form';
  setDisplayMode: (mode: 'search' | 'form') => void;
}
