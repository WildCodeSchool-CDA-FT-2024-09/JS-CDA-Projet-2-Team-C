import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      label
    }
  }
`;

export const GET_DEPARTMENT_AND_DOCTOR = gql`
  query DepartmentsAndDoctors {
    departments {
      id
      label
    }
    getDoctors {
      firstname
      id
      lastname
    }
  }
`;
