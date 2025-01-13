import { gql } from '@apollo/client';

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

export const UPDATE_DOCTOR_WORKING_HOURS = gql`
  mutation UpdateDoctorWorkingHours(
    $workingHours: [WorkingHoursInput!]!
    $doctorId: String!
  ) {
    updateDoctorWorkingHours(workingHours: $workingHours, doctorId: $doctorId)
  }
`;
