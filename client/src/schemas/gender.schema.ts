import { gql } from '@apollo/client';

export const GET_GENDERS = gql`
  query Genders {
    genders {
      id
      label
    }
  }
`;
