import { gql } from '@apollo/client';

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      label
      code
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
