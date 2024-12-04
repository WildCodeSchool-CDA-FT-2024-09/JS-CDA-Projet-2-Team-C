import ConsultationsTimelineEvent from '../ConsultationsTimelineEvent/ConsultationsTimelineEvent';
import { ConsultationsTimelineProps } from './ConsultationsTimeline.types';
import './ConsultationsTimeline.css';

// See https://daisyui.com/components/timeline/ for vertical timeline

export default function ConsultationsTimeline({
  consultations
}: ConsultationsTimelineProps) {
  return (
    <ul className="timeline timeline-vertical">
      {consultations.map((consultation, index) => (
        <li key={`${consultation?.id}-${consultation?.consultationDate}`}>
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
