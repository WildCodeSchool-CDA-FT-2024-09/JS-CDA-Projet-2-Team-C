import { Consultation } from '../../generated/graphql-types';
import ConsultationsTimelineEvent from '../ConsultationsTimelineEvent/ConsultationsTimelineEvent';
import './ConsultationsTimeline.css';

interface ConsultationsTimelineProps {
  consultations: Partial<Consultation[]>;
}

// See https://daisyui.com/components/timeline/

export default function ConsultationTimeline({
  consultations
}: ConsultationsTimelineProps) {
  return (
    <ul className="timeline timeline-vertical">
      {consultations.map((consultation, index) => (
        <li
          key={`${consultation?.id}-${consultation?.consultationDate}`}
          className=""
        >
          <ConsultationsTimelineEvent
            consultation={consultation as Consultation}
            isFirst={index === 0}
            isLast={index === consultations?.length - 1}
          />
        </li>
      ))}
    </ul>
  );
}
