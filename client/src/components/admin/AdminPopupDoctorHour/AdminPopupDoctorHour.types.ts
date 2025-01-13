import { GetAllUsersQuery } from '../../generated/graphql-types';

export interface AdminPopupDoctorHourProps {
  isOpen: boolean;
  onClose: () => void;
  idDoctor: string;
  nameDoctor: string;
  refetchUsers?: () => void; // Marqué comme optionnel si non utilisé partout
  onUpdate: () => void; // Marqué comme optionnel si non utilisé partout
}

export interface WorkingHour {
  weekday: number;
  startTime: string;
  endTime: string;
}

export type User = GetAllUsersQuery['getAllUsers']['users'][0];
