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
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      role {
        id
        label
        code
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation AddUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $roleCode: String!
    $departmentLabel: String
    $genderLabel: String
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      roleCode: $roleCode
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
        code
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

export const GET_CURRENT_AUTH_USER = gql`
  query GetCurrentAuthUser {
    getCurrentAuthUser {
      email
      id
      role {
        id
        code
        label
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
