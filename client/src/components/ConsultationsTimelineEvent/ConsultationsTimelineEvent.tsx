import { ConsultationsTimelineEventProps } from './ConsultationsTimeLineEvent.types';
import { frenchLargeDate } from '../../utils/dates.utils';
import FileList from '../FileList/FileList';

export default function ConsultationsTimelineEvent({
  consultation,
  isFirst,
  isLast
}: ConsultationsTimelineEventProps) {
  const { id, consultationDate, subject, description, doctor, attachments } =
    consultation;

  const files = attachments?.filter((attachment) => attachment.filePath);
  const notes = attachments?.filter((attachment) => !attachment.filePath);

  // See https://daisyui.com/components/accordion/ for accordion behaviour and why the radio inputs are needed

  return (
    <>
      {!isFirst && <hr />}
      <div className="text-grey timeline-start">
        {frenchLargeDate(consultationDate)}
      </div>
      <div className="timeline-middle h-8 w-8 rounded-2xl bg-primary-lighter"></div>
      <article className="flex-2 collapse timeline-end collapse-plus timeline-box bg-primary-lighter">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title flex flex-wrap items-baseline gap-2 text-xl font-medium text-primary-darker">
          <h3>{subject.label}</h3>
          <div className="badge badge-neutral">{doctor?.department?.label}</div>
          <p>{description}</p>
        </div>
        <section className="collapse-content grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor={`consultation-${id}-doctor-note`}>
              {`Note du docteur ${doctor?.firstname} ${doctor?.lastname}`}
            </label>
            <p
              id={`consultation-${id}-doctor-note`}
              className="flex-grow rounded bg-white p-1"
            >
              {notes?.length ? notes[0].note : 'Aucune note'}
            </p>
          </div>
          <div className="flex flex-col">
            <FileList files={files} consultationId={id} />
          </div>
        </section>
      </article>
      {!isLast && <hr />}
    </>
  );
}
