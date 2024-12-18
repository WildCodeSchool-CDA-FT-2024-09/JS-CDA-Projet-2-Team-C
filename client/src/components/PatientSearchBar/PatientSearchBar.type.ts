export default interface PatientSearchBarProps {
  handlePatientSelected: (patientId: number) => void;
  restriction?: boolean;
}
