import { gql } from '@apollo/client';

export const GET_CONSULTATIONS_BY_DOCTOR_ID = gql`
  query ConsultationsByDoctorId($doctorId: Float!) {
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
