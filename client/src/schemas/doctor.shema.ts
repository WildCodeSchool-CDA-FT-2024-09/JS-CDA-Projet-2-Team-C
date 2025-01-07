import { gql } from '@apollo/client';

export const GET_DOCTOR_BY_ID = gql`
  query GetDoctorById($id: Int!) {
    getDoctorById(id: $id) {
      firstname
      lastname
      workingHours {
        startTime
        endTime
        weekDay
      }
    }
  }
`;
