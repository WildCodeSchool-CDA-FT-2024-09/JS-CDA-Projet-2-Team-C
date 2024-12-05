import { PartialConsultation } from '../ConsultationsTimeline/ConsultationsTimeline.types';

export interface ConsultationsTimelineEventProps {
  consultation: PartialConsultation;
  isFirst?: boolean;
  isLast?: boolean;
}
