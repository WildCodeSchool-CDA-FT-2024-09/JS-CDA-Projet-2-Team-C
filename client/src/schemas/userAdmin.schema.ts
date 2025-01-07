import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers(
    $skip: Int!
    $take: Int!
    $roleCode: String
    $searchByName: String
  ) {
    getAllUsers(
      skip: $skip
      take: $take
      roleCode: $roleCode
      searchByName: $searchByName
    ) {
      users {
        id
        firstname
        lastname
        email
        role {
          code
          label
        }
        department {
          label
          id
        }
        gender {
          id
          label
        }
      }
      total
      hasMore
    }
  }
`;
