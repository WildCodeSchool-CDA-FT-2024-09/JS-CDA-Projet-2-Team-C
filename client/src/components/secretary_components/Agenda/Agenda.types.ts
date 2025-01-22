import { ConsultationsByDoctorIdQuery } from '../../../generated/graphql-types';
import { ConsultationDateTime } from '../../../pages/SecretaryHome/SecretaryHome.types';

export interface AgendaProps {
  className?: string;
  consultations: ConsultationsByDoctorIdQuery['consultationsByDoctorId'];
  newConsultation?: ConsultationDateTime;
  handleSelectSlot?:
    | ((slotInfo: { start: Date; end: Date }) => void)
    | undefined; // from react-big-calendar
}
