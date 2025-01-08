import { Consultation } from '../../../generated/graphql-types';

export const convertToCalendarEvent = (consultation: Consultation) => {
  const start = new Date(
    `${consultation.consultationDate}T${consultation.startTime}`
  );
  const end = new Date(
    start.getTime() + consultation.durationMinutes * 60 * 1000
  );
  const title = `${consultation.subject.label} - ${consultation.patient.firstname} ${consultation.patient.lastname}`;
  const convertedConsultation = { ...consultation, start, end, title };
  return convertedConsultation;
};

export const convertToCalendarEvents = (consultations: Consultation[]) => {
  const convertedConsultations = consultations.map((consultation) => {
    return convertToCalendarEvent(consultation);
  });
  return convertedConsultations;
};
