export default interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Appointment;
}
export interface Doctor {
  id: string;
  firstname: string;
  lastname: string;
  department?: {
    label: string;
  };
}

export interface Patient {
  id: string;
  firstname: string;
  lastname: string;
}

export interface Appointment {
  id: string;
  startTime: string;
  doctor: Doctor;
  patient: Patient;
}
