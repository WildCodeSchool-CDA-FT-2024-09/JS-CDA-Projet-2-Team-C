import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers($skip: Int!, $take: Int!, $roleCode: String) {
    getAllUsers(skip: $skip, take: $take, roleCode: $roleCode) {
      users {
        id
        firstname
        lastname
        email
        role {
          id
          code
          label
        }
      }
      total
      hasMore
    }
  }
`;
