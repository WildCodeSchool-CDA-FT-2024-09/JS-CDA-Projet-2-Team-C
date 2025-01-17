export interface AgentSearchBarProps {
  handleChange: (value: string) => void;
  search: string;
}

export interface Patient {
  ssn: string;
  firstname?: string;
  lastname?: string;
}
