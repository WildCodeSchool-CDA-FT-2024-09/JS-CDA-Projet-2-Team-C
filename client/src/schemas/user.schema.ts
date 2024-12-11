import { gql } from '@apollo/client';

export const GET_DOCTORS_BY_DEPARTMENT = gql`
  query GetDoctorByDepartment($label: String!) {
    getDoctorByDepartment(label: $label) {
      id
      label
      users {
        firstname
        lastname
        id
      }
    }
  }
`;

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
