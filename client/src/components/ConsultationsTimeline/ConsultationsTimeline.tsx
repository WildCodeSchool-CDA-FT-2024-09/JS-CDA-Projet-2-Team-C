import { Consultation } from '../../generated/graphql-types';
import ConsultationsTimelineEvent from '../ConsultationsTimelineEvent/ConsultationsTimelineEvent';

interface ConsultationsTimelineProps {
  consultations: Partial<Consultation[]>;
}

// See https://daisyui.com/components/timeline/

export default function ConsultationTimeline({
  consultations
}: ConsultationsTimelineProps) {
  return (
    <ul className="timeline timeline-vertical">
      {consultations.map((consultation) => (
        <ConsultationsTimelineEvent consultation={consultation} />
      ))}
    </ul>
  );
}
