import { gql } from '@apollo/client';

export const GET_RESTRICTED_CONSULTATIONS_BY_DOCTOR_ID = gql`
  query RestrictedConsultationsByDoctorId($doctorId: String!) {
    restrictedConsultationsByDoctorId(doctorId: $doctorId) {
      doctor {
        firstname
        department {
          label
        }
      }
      patient {
        firstname
        lastname
      }
      startTime
      consultationDate
    }
  }
`;
