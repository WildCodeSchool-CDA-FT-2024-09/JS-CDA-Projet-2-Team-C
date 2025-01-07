export default interface PatientSelectorProps {
  handlePatientSelected: (patientId: number) => void;
  patientId: number;
}
