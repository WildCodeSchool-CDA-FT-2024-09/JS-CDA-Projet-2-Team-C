import { PatientDetailsProps } from './PatientDetails.types';

export default function PatientDetails({ patientId }: PatientDetailsProps) {
  return <h2>{patientId}</h2>;
}
