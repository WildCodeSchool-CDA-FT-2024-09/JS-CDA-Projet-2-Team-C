import { Consultation } from '../../generated/graphql-types';

export type ConsultationDateTime = Pick<
  Consultation,
  'consultationDate' | 'startTime' | 'durationMinutes'
>;
