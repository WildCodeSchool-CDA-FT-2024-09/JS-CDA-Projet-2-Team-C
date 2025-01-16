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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $firstname: String
    $lastname: String
    $email: String
    $genderLabel: String
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      genderLabel: $genderLabel
    ) {
      id
      firstname
      lastname
      email
      gender {
        id
        label
      }
    }
  }
`;
