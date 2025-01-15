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
<<<<<<< HEAD
        workingHours {
          endTime
          startTime
          weekday
=======
        department {
          label
          id
        }
        gender {
          id
          label
>>>>>>> 38d4a3457cc6ff157eab3cd45e5cf8d552be73e3
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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $firstname: String
    $lastname: String
    $email: String
    $genderLabel: String
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      genderLabel: $genderLabel
    ) {
      id
      firstname
      lastname
      email
      gender {
        id
        label
      }
    }
  }
`;
