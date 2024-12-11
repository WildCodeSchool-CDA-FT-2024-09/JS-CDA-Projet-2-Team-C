import { gql } from '@apollo/client';

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      label
    }
  }
`;

export const GET_ROLES_WITH_USERS = gql`
  query RolesWithUsers {
    roles {
      id
      label
      users {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query Departments {
    departments {
      id
      label
    }
  }
`;

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
