import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      label
    }
  }
`;

// Used in Doctor Selector for Secretaries
// This query fetches the data in a pre-structured way.
// that's why it looks like a duplicate
export const GET_DEPARTMENTS_WITH_DOCTORS = gql`
  query DepartmentsWithDoctors {
    allDepartmentsWithDoctors {
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
