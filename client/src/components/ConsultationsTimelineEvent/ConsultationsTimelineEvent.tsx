import { Consultation } from '../../generated/graphql-types';
import { frenchLargeDate } from '../../utils/dates.utils';

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
  const { id, consultationDate, description, doctor, attachments } =
    consultation;

  const files = attachments?.filter((attachment) => attachment.filePath);
  const notes = attachments?.filter((attachment) => !attachment.filePath);

  // See https://daisyui.com/components/accordion/ for accordion behaviour
  // See

  return (
    <>
      {!isFirst && <hr />}
      <div className="text-grey timeline-start">
        {frenchLargeDate(consultationDate)}
      </div>
      <div className="timeline-middle h-8 w-8 rounded-2xl bg-primary-lighter"></div>
      <article className="flex-2 collapse timeline-end collapse-plus timeline-box bg-primary-lighter">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-primary-darker">
          <h3>{description}</h3>
          <div className="badge badge-neutral">{doctor?.department.label}</div>
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
            <label htmlFor={`consultation-${id}-files`}>
              Fichiers associés
            </label>
            <ul
              id={`consultation-${id}-files`}
              className="flex-grow rounded bg-white p-1"
            >
              {files?.map((file) => (
                <li>
                  <div className="card h-36 w-36 rounded bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src="https://imgs.search.brave.com/O7gW6bMXXWkEkyezEqDGTJcO_re6iEkxFW5L2-IW1k0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9waG90/by1vcnRob3AlQzMl/QTlkaXF1ZS1kLW9z/LWRlLXBpZWQtZGUt/cmF5b24teC0yOTc0/MDAwNS5qcGc"
                        alt={file.note}
                      />
                    </figure>
                    <div className="card-body p-2">
                      <p>{file.fileDisplayName}</p>
                    </div>
                  </div>
                </li>
              ))}
              {files.length === 0 && 'Aucun'}
            </ul>
          </div>
        </section>
      </article>
      {!isLast && <hr />}
    </>
  );
}
