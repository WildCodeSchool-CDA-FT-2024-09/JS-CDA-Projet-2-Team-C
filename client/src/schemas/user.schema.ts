import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      role {
        id
        label
        code
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
        workingHours {
          endTime
          startTime
          weekday
        }
      }
      total
      hasMore
    }
  }
`;
