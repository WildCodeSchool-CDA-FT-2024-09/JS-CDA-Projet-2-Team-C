import { Consultation } from '../../generated/graphql-types';

type PartialConsultation = Pick<
  Consultation,
  'id' | 'consultationDate' | 'description' | 'doctor' | 'attachments'
>;

export interface ConsultationsTimelineProps {
  consultations: Array<PartialConsultation>;
}
