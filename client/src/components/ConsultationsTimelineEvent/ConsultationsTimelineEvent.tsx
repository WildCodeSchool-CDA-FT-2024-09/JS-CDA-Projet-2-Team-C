import { Consultation } from '../../generated/graphql-types';

interface ConsultationsTimelineEventProps {
  consultation: Partial<Consultation>;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ConsultationsTimelineEvent({
  consultation,
  isFirst,
  isLast
}: ConsultationsTimelineEventProps) {
  // console.log('consult', consultation);

  const { id, consultationDate, description } = consultation;

  // TO DEBATE : Does this need to be a utility function ? Outside of this component ?
  let date = 'date inconnue';
  if (consultationDate) {
    date = new Date(consultationDate).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <li key={`${id}-${consultationDate}`}>
      {!isFirst && <hr />}
      <div className="timeline-start">{date}</div>
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <article className="timeline-end timeline-box">{description}</article>
      {!isLast && <hr />}
    </li>
  );
}
