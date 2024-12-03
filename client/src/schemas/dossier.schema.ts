import { gql } from '@apollo/client';

export const GET_DOSSIER_BY_PATIENT_ID = gql`
  query Dossier($patientId: Float!) {
    dossier(patientId: $patientId) {
      patient {
        firstname
        lastname
        gender {
          label
        }
      }
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
          role {
            label
          }
        }
      }
    }
  }
`;
