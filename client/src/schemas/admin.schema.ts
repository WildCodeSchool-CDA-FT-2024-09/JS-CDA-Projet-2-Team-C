import { gql } from '@apollo/client';

export const GET_DEPARTMENTS_AND_GENDERS_AND_ROLES = gql`
  query DepartmentsAndGendersAndRoles {
    genders {
      id
      label
    }
    departments {
      id
      label
    }
    roles {
      id
      label
    }
  }
`;
