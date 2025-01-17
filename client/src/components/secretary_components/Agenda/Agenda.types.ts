import { Consultation } from '../../../generated/graphql-types';
import { ConsultationDateTime } from '../../../pages/SecretaryHome/SecretaryHome.types';

export interface AgendaProps {
  consultations: Consultation[];
  newConsultation: ConsultationDateTime;
  handleSelectSlot:
    | ((slotInfo: { start: Date; end: Date }) => void)
    | undefined; // from react-big-calendar
}
