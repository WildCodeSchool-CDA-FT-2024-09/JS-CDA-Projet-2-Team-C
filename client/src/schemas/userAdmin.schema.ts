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
    $departmentLabel: String
    $genderLabel: String
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      departmentLabel: $departmentLabel
      genderLabel: $genderLabel
    ) {
      id
      firstname
      lastname
      email
      department {
        label
        id
      }
      gender {
        id
        label
      }
    }
  }
`;
