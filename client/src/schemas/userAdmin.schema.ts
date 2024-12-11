import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Get_All_Users {
    users {
      id
      firstname
      lastname
      email
      role {
        id
        label
      }
    }
  }
`;
