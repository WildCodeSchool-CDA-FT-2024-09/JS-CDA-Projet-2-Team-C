export default interface PatientSelectorProps {
  handlePatientSelected: (patientId: number) => void;
  patientId: number | null;
  displayMode: 'search' | 'form';
  setDisplayMode: (mode: 'search' | 'form') => void;
}
