import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstname
      lastname
      email
      role {
        id
        label
        code
      }
    }
  }
`;
