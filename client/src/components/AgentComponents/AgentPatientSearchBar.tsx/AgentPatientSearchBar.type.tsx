export default interface AgentPatientSearchBarProps {
  handlePatientSelected: (patientId: number) => void;
  restriction?: boolean;
}
