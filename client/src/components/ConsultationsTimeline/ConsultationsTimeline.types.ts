import { Consultation } from '../../generated/graphql-types';

export type PartialConsultation = Pick<
  Consultation,
  | 'id'
  | 'consultationDate'
  | 'subject'
  | 'description'
  | 'doctor'
  | 'attachments'
>;

export interface ConsultationsTimelineProps {
  consultations: PartialConsultation[];
}
