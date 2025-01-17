import { gql } from '@apollo/client';

export const GET_RESTRICTED_CONSULTATIONS_BY_DOCTOR_ID = gql`
  query RestrictedConsultations($doctorId: String, $ssn: String) {
    restrictedConsultations(doctorId: $doctorId, ssn: $ssn) {
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
