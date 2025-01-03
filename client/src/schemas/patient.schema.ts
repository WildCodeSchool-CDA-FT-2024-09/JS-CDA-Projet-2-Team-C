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

// This query is used by PatientSearchBar to browse patients by their name
export const GET_PATIENTS_BY_NAME = gql`
  query GetPatientsByName($search: String!) {
    patients(search: $search) {
      id
      firstname
      lastname
      ssn
      dateOfBirth
      gender {
        label
      }
    }
  }
`;
