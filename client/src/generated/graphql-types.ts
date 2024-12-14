//test for error ts on useAuth.ts

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Attachment = {
  __typename?: 'Attachment';
  author: User;
  consultation: Consultation;
  createdAt: Scalars['String']['output'];
  fileDisplayName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  note: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  role: Role;
  token: Scalars['String']['output'];
};

export type Consultation = {
  __typename?: 'Consultation';
  attachments: Array<Attachment>;
  author: User;
  consultationDate: Scalars['Date']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  doctor: User;
  durationMinutes: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  patient: Patient;
  startTime: Scalars['String']['output'];
  subject: ConsultationSubject;
  updatedAt: Scalars['String']['output'];
};

export type ConsultationSubject = {
  __typename?: 'ConsultationSubject';
  consultations: Array<Consultation>;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users: Array<User>;
};

export type Gender = {
  __typename?: 'Gender';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  patients: Array<Patient>;
  users: Array<User>;
};

export type Patient = {
  __typename?: 'Patient';
  consultations: Array<Consultation>;
  createdAt: Scalars['String']['output'];
  dateOfBirth: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
  ssn: Scalars['String']['output'];
  town: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  departments: Array<Department>;
  dossier: Array<Consultation>;
  /** Fetches departments by label and their doctors */
  getDoctorByDepartment: Array<Department>;
  /** Fetches all users with the role of doctor */
  getDoctors: Array<User>;
  login: AuthUser;
  patient: Patient;
  patients: Array<Patient>;
  roles: Array<Role>;
  users: Array<User>;
};

export type QueryDossierArgs = {
  patientId: Scalars['Float']['input'];
};

export type QueryGetDoctorByDepartmentArgs = {
  label: Scalars['String']['input'];
};

export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type QueryPatientArgs = {
  patientId: Scalars['Float']['input'];
};

export type QueryPatientsArgs = {
  search: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  attachmentsCreated?: Maybe<Array<Attachment>>;
  consultationsCreated?: Maybe<Array<Consultation>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Department>;
  doctorConsultations?: Maybe<Array<Consultation>>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['Int']['output'];
  isArchived: Scalars['Boolean']['output'];
  lastname: Scalars['String']['output'];
  role: Role;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workingHours?: Maybe<Array<WorkingHours>>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  endTime: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['String']['output'];
  weekday: Scalars['Int']['output'];
};

export type DepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type DepartmentsQuery = {
  __typename?: 'Query';
  departments: Array<{ __typename?: 'Department'; id: number; label: string }>;
};

export type DepartmentsAndDoctorsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DepartmentsAndDoctorsQuery = {
  __typename?: 'Query';
  departments: Array<{ __typename?: 'Department'; id: number; label: string }>;
  getDoctors: Array<{
    __typename?: 'User';
    firstname: string;
    id: number;
    lastname: string;
  }>;
};

export type DossierQueryVariables = Exact<{
  patientId: Scalars['Float']['input'];
}>;

export type DossierQuery = {
  __typename?: 'Query';
  dossier: Array<{
    __typename?: 'Consultation';
    id: number;
    consultationDate: any;
    description: string;
    subject: { __typename?: 'ConsultationSubject'; label: string };
    doctor: {
      __typename?: 'User';
      firstname: string;
      lastname: string;
      department?: {
        __typename?: 'Department';
        label: string;
        id: number;
      } | null;
    };
    attachments: Array<{
      __typename?: 'Attachment';
      id: number;
      note: string;
      filePath: string;
      fileDisplayName: string;
      author: {
        __typename?: 'User';
        firstname: string;
        lastname: string;
        role: { __typename?: 'Role'; label: string };
      };
    }>;
  }>;
};

export type PatientQueryVariables = Exact<{
  patientId: Scalars['Float']['input'];
}>;

export type PatientQuery = {
  __typename?: 'Query';
  patient: {
    __typename?: 'Patient';
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: any;
    postcode: string;
    ssn: string;
    town: string;
    gender: { __typename?: 'Gender'; label: string };
  };
};

export type GetPatientsByNameQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type GetPatientsByNameQuery = {
  __typename?: 'Query';
  patients: Array<{
    __typename?: 'Patient';
    id: number;
    firstname: string;
    lastname: string;
  }>;
};

export type RolesQueryVariables = Exact<{ [key: string]: never }>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: Array<{
    __typename?: 'Role';
    id: number;
    label: string;
    code: string;
  }>;
};

export type RolesWithUsersQueryVariables = Exact<{ [key: string]: never }>;

export type RolesWithUsersQuery = {
  __typename?: 'Query';
  roles: Array<{
    __typename?: 'Role';
    id: number;
    label: string;
    users: Array<{
      __typename?: 'User';
      id: number;
      firstname: string;
      lastname: string;
    }>;
  }>;
};

export type GetDoctorByDepartmentQueryVariables = Exact<{
  label: Scalars['String']['input'];
}>;

export type GetDoctorByDepartmentQuery = {
  __typename?: 'Query';
  getDoctorByDepartment: Array<{
    __typename?: 'Department';
    id: number;
    label: string;
    users: Array<{
      __typename?: 'User';
      firstname: string;
      lastname: string;
      id: number;
    }>;
  }>;
};

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;

export type LoginQuery = {
  __typename?: 'Query';
  login: {
    __typename?: 'AuthUser';
    id: number;
    email: string;
    token: string;
    role: { __typename?: 'Role'; id: number; label: string };
  };
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: { __typename?: 'Role'; id: number; label: string; code: string };
  }>;
};

export const DepartmentsDocument = gql`
  query Departments {
    departments {
      id
      label
    }
  }
`;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DepartmentsQuery,
    DepartmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    options
  );
}
export function useDepartmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DepartmentsQuery,
    DepartmentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    options
  );
}
export function useDepartmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        DepartmentsQuery,
        DepartmentsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    options
  );
}
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<
  typeof useDepartmentsLazyQuery
>;
export type DepartmentsSuspenseQueryHookResult = ReturnType<
  typeof useDepartmentsSuspenseQuery
>;
export type DepartmentsQueryResult = Apollo.QueryResult<
  DepartmentsQuery,
  DepartmentsQueryVariables
>;
export const DepartmentsAndDoctorsDocument = gql`
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

/**
 * __useDepartmentsAndDoctorsQuery__
 *
 * To run a query within a React component, call `useDepartmentsAndDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsAndDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsAndDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsAndDoctorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DepartmentsAndDoctorsQuery,
    DepartmentsAndDoctorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    DepartmentsAndDoctorsQuery,
    DepartmentsAndDoctorsQueryVariables
  >(DepartmentsAndDoctorsDocument, options);
}
export function useDepartmentsAndDoctorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DepartmentsAndDoctorsQuery,
    DepartmentsAndDoctorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    DepartmentsAndDoctorsQuery,
    DepartmentsAndDoctorsQueryVariables
  >(DepartmentsAndDoctorsDocument, options);
}
export function useDepartmentsAndDoctorsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        DepartmentsAndDoctorsQuery,
        DepartmentsAndDoctorsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    DepartmentsAndDoctorsQuery,
    DepartmentsAndDoctorsQueryVariables
  >(DepartmentsAndDoctorsDocument, options);
}
export type DepartmentsAndDoctorsQueryHookResult = ReturnType<
  typeof useDepartmentsAndDoctorsQuery
>;
export type DepartmentsAndDoctorsLazyQueryHookResult = ReturnType<
  typeof useDepartmentsAndDoctorsLazyQuery
>;
export type DepartmentsAndDoctorsSuspenseQueryHookResult = ReturnType<
  typeof useDepartmentsAndDoctorsSuspenseQuery
>;
export type DepartmentsAndDoctorsQueryResult = Apollo.QueryResult<
  DepartmentsAndDoctorsQuery,
  DepartmentsAndDoctorsQueryVariables
>;
export const DossierDocument = gql`
  query Dossier($patientId: Float!) {
    dossier(patientId: $patientId) {
      id
      consultationDate
      subject {
        label
      }
      description
      doctor {
        firstname
        lastname
        department {
          label
          id
        }
      }
      attachments {
        id
        note
        filePath
        fileDisplayName
        author {
          firstname
          lastname
          role {
            label
          }
        }
      }
    }
  }
`;

/**
 * __useDossierQuery__
 *
 * To run a query within a React component, call `useDossierQuery` and pass it any options that fit your needs.
 * When your component renders, `useDossierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDossierQuery({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useDossierQuery(
  baseOptions: Apollo.QueryHookOptions<DossierQuery, DossierQueryVariables> &
    ({ variables: DossierQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DossierQuery, DossierQueryVariables>(
    DossierDocument,
    options
  );
}
export function useDossierLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DossierQuery, DossierQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DossierQuery, DossierQueryVariables>(
    DossierDocument,
    options
  );
}
export function useDossierSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<DossierQuery, DossierQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DossierQuery, DossierQueryVariables>(
    DossierDocument,
    options
  );
}
export type DossierQueryHookResult = ReturnType<typeof useDossierQuery>;
export type DossierLazyQueryHookResult = ReturnType<typeof useDossierLazyQuery>;
export type DossierSuspenseQueryHookResult = ReturnType<
  typeof useDossierSuspenseQuery
>;
export type DossierQueryResult = Apollo.QueryResult<
  DossierQuery,
  DossierQueryVariables
>;
export const PatientDocument = gql`
  query Patient($patientId: Float!) {
    patient(patientId: $patientId) {
      id
      firstname
      lastname
      email
      dateOfBirth
      gender {
        label
      }
      postcode
      ssn
      town
    }
  }
`;

/**
 * __usePatientQuery__
 *
 * To run a query within a React component, call `usePatientQuery` and pass it any options that fit your needs.
 * When your component renders, `usePatientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePatientQuery({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function usePatientQuery(
  baseOptions: Apollo.QueryHookOptions<PatientQuery, PatientQueryVariables> &
    ({ variables: PatientQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PatientQuery, PatientQueryVariables>(
    PatientDocument,
    options
  );
}
export function usePatientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PatientQuery, PatientQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PatientQuery, PatientQueryVariables>(
    PatientDocument,
    options
  );
}
export function usePatientSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<PatientQuery, PatientQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PatientQuery, PatientQueryVariables>(
    PatientDocument,
    options
  );
}
export type PatientQueryHookResult = ReturnType<typeof usePatientQuery>;
export type PatientLazyQueryHookResult = ReturnType<typeof usePatientLazyQuery>;
export type PatientSuspenseQueryHookResult = ReturnType<
  typeof usePatientSuspenseQuery
>;
export type PatientQueryResult = Apollo.QueryResult<
  PatientQuery,
  PatientQueryVariables
>;
export const GetPatientsByNameDocument = gql`
  query GetPatientsByName($search: String!) {
    patients(search: $search) {
      id
      firstname
      lastname
    }
  }
`;

/**
 * __useGetPatientsByNameQuery__
 *
 * To run a query within a React component, call `useGetPatientsByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatientsByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatientsByNameQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPatientsByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPatientsByNameQuery,
    GetPatientsByNameQueryVariables
  > &
    (
      | { variables: GetPatientsByNameQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPatientsByNameQuery,
    GetPatientsByNameQueryVariables
  >(GetPatientsByNameDocument, options);
}
export function useGetPatientsByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPatientsByNameQuery,
    GetPatientsByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPatientsByNameQuery,
    GetPatientsByNameQueryVariables
  >(GetPatientsByNameDocument, options);
}
export function useGetPatientsByNameSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPatientsByNameQuery,
        GetPatientsByNameQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetPatientsByNameQuery,
    GetPatientsByNameQueryVariables
  >(GetPatientsByNameDocument, options);
}
export type GetPatientsByNameQueryHookResult = ReturnType<
  typeof useGetPatientsByNameQuery
>;
export type GetPatientsByNameLazyQueryHookResult = ReturnType<
  typeof useGetPatientsByNameLazyQuery
>;
export type GetPatientsByNameSuspenseQueryHookResult = ReturnType<
  typeof useGetPatientsByNameSuspenseQuery
>;
export type GetPatientsByNameQueryResult = Apollo.QueryResult<
  GetPatientsByNameQuery,
  GetPatientsByNameQueryVariables
>;
export const RolesDocument = gql`
  query Roles {
    roles {
      id
      label
      code
    }
  }
`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options
  );
}
export function useRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options
  );
}
export function useRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(
    RolesDocument,
    options
  );
}
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<
  typeof useRolesSuspenseQuery
>;
export type RolesQueryResult = Apollo.QueryResult<
  RolesQuery,
  RolesQueryVariables
>;
export const RolesWithUsersDocument = gql`
  query RolesWithUsers {
    roles {
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

/**
 * __useRolesWithUsersQuery__
 *
 * To run a query within a React component, call `useRolesWithUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesWithUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesWithUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesWithUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    RolesWithUsersQuery,
    RolesWithUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RolesWithUsersQuery, RolesWithUsersQueryVariables>(
    RolesWithUsersDocument,
    options
  );
}
export function useRolesWithUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RolesWithUsersQuery,
    RolesWithUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RolesWithUsersQuery, RolesWithUsersQueryVariables>(
    RolesWithUsersDocument,
    options
  );
}
export function useRolesWithUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        RolesWithUsersQuery,
        RolesWithUsersQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RolesWithUsersQuery,
    RolesWithUsersQueryVariables
  >(RolesWithUsersDocument, options);
}
export type RolesWithUsersQueryHookResult = ReturnType<
  typeof useRolesWithUsersQuery
>;
export type RolesWithUsersLazyQueryHookResult = ReturnType<
  typeof useRolesWithUsersLazyQuery
>;
export type RolesWithUsersSuspenseQueryHookResult = ReturnType<
  typeof useRolesWithUsersSuspenseQuery
>;
export type RolesWithUsersQueryResult = Apollo.QueryResult<
  RolesWithUsersQuery,
  RolesWithUsersQueryVariables
>;
export const GetDoctorByDepartmentDocument = gql`
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

/**
 * __useGetDoctorByDepartmentQuery__
 *
 * To run a query within a React component, call `useGetDoctorByDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorByDepartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorByDepartmentQuery({
 *   variables: {
 *      label: // value for 'label'
 *   },
 * });
 */
export function useGetDoctorByDepartmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDoctorByDepartmentQuery,
    GetDoctorByDepartmentQueryVariables
  > &
    (
      | { variables: GetDoctorByDepartmentQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDoctorByDepartmentQuery,
    GetDoctorByDepartmentQueryVariables
  >(GetDoctorByDepartmentDocument, options);
}
export function useGetDoctorByDepartmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDoctorByDepartmentQuery,
    GetDoctorByDepartmentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDoctorByDepartmentQuery,
    GetDoctorByDepartmentQueryVariables
  >(GetDoctorByDepartmentDocument, options);
}
export function useGetDoctorByDepartmentSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDoctorByDepartmentQuery,
        GetDoctorByDepartmentQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetDoctorByDepartmentQuery,
    GetDoctorByDepartmentQueryVariables
  >(GetDoctorByDepartmentDocument, options);
}
export type GetDoctorByDepartmentQueryHookResult = ReturnType<
  typeof useGetDoctorByDepartmentQuery
>;
export type GetDoctorByDepartmentLazyQueryHookResult = ReturnType<
  typeof useGetDoctorByDepartmentLazyQuery
>;
export type GetDoctorByDepartmentSuspenseQueryHookResult = ReturnType<
  typeof useGetDoctorByDepartmentSuspenseQuery
>;
export type GetDoctorByDepartmentQueryResult = Apollo.QueryResult<
  GetDoctorByDepartmentQuery,
  GetDoctorByDepartmentQueryVariables
>;
export const LoginDocument = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      role {
        id
        label
      }
      token
    }
  }
`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(
  baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> &
    ({ variables: LoginQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export function useLoginSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<
  typeof useLoginSuspenseQuery
>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;
export const GetAllUsersDocument = gql`
  query GetAllUsers {
    users {
      id
      firstname
      lastname
      email
      role {
        id
        label
        code
      }
    }
  }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllUsersQuery,
        GetAllUsersQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetAllUsersSuspenseQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
