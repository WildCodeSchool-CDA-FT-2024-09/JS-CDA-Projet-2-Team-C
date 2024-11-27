import { gql } from '@apollo/client';

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      label
    }
  }
`;
