import { gql } from '@apollo/client';

export const GET_DOCTOR_BY_ID = gql`
  query GetDoctorById($id: String!) {
    getDoctorById(id: $id) {
      firstname
      lastname
      workingHours {
        startTime
        endTime
        weekday
      }
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

export const UPDATE_DOCTOR_WORKING_HOURS = gql`
  mutation UpdateDoctorWorkingHours(
    $workingHours: [WorkingHoursInput!]!
    $doctorId: String!
  ) {
    updateDoctorWorkingHours(workingHours: $workingHours, doctorId: $doctorId)
  }
`;
