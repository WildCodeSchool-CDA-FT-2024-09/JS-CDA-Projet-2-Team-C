import { gql } from '@apollo/client';

export const ADD_USER_MUTATION = gql`
  mutation AddUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $roleLabel: String!
    $departmentLabel: String
    $genderLabel: String
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      roleLabel: $roleLabel
      departmentLabel: $departmentLabel
      genderLabel: $genderLabel
    ) {
      id
      firstname
      lastname
      email
      role {
        id
        label
      }
      department {
        id
        label
      }
      gender {
        id
        label
      }
      createdAt
    }
  }
`;
