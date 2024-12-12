import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      role {
        id
        label
      }
      token
    }
  }
`;
