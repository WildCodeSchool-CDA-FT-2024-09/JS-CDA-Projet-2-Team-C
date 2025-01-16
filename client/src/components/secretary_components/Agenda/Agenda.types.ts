import { Consultation } from '../../../generated/graphql-types';

export interface AgendaProps {
  consultations: Consultation[];
  handleSelectSlot:
    | ((slotInfo: { start: Date; end: Date }) => void)
    | undefined; // from react-big-calendar
}
