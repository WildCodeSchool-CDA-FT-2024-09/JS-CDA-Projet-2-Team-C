import { gql } from '@apollo/client';

// This query is resolved in the Consultations resolver
export const GET_DOSSIER_BY_PATIENT_ID = gql`
  query Dossier($patientId: Float!) {
    dossier(patientId: $patientId) {
      id
      consultationDate
      description
      doctor {
        firstname
        lastname
        department {
          label
          id
        }
      }
      attachments {
        note
        filePath
        fileDisplayName
        author {
          firstname
          lastname
          role {
            label
          }
        }
      }
    }
  }
`;
