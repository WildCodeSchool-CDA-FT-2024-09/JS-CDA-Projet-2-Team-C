import { gql } from '@apollo/client';

// This query is used for the dossier
export const GET_PATIENT_BY_ID = gql`
  query Patient($patientId: Float!) {
    patient(patientId: $patientId) {
      id
      firstname
      lastname
      email
      dateOfBirth
      gender {
        label
      }
      postcode
      ssn
      town
    }
  }
`;
