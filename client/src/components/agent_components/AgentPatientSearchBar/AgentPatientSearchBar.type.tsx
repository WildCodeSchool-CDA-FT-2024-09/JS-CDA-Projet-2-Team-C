export interface AgentPatientSearchBarProps {
  handlePatientSelected: (patientId: number) => void;
}
export interface Patient {
  ssn: string | number;
  firstname?: string;
  lastname?: string;
}
