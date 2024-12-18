import { gql } from '@apollo/client';

export const GET_DISPLAY_TEXT = gql`
  query DisplayText {
    displayText {
      label
      textFR
    }
  }
`;
