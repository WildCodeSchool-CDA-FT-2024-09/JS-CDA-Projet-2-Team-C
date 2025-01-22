import { gql } from '@apollo/client';

export const GET_CONSULTATIONS_BY_DOCTOR_ID = gql`
  query ConsultationsByDoctorId($doctorId: String!) {
    consultationsByDoctorId(doctorId: $doctorId) {
      consultationDate
      startTime
      durationMinutes
      description
      id
      patient {
        firstname
        lastname
        id
      }
      subject {
        label
        id
      }
    }
  }
`;

export const GET_CONSULTATIONS_SUBJECTS = gql`
  query ConsultationSubjects {
    consultationSubjects {
      id
      label
    }
  }
`;

export const CREATE_CONSULTATION = gql`
  mutation CreateConsultation(
    $description: String!
    $end: String!
    $start: String!
    $patientId: String!
    $subjectLabel: String!
    $doctorId: String!
  ) {
    createConsultation(
      description: $description
      end: $end
      start: $start
      patientId: $patientId
      subjectLabel: $subjectLabel
      doctorId: $doctorId
    ) {
      id
    }
  }
`;
