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
  id: Scalars['String']['output'];
  role: Role;
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
  id: Scalars['String']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  login: AuthUser;
  /** Logs out the user by clearing the medagendatoken cookie */
  logout: Scalars['Boolean']['output'];
  updateUser: User;
};

export type MutationAddUserArgs = {
  departmentLabel?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  genderLabel?: InputMaybe<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
  roleCode: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  genderLabel?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  hasMore: Scalars['Boolean']['output'];
  total: Scalars['Int']['output'];
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
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  postcode: Scalars['String']['output'];
  ssn: Scalars['String']['output'];
  town: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Fetches all departments and their doctors */
  allDepartmentsWithDoctors: Array<Department>;
  consultationSubjects: Array<ConsultationSubject>;
  consultationsByDoctorId: Array<Consultation>;
  departments: Array<Department>;
  dossier: Array<Consultation>;
  genders: Array<Gender>;
  /** Fetch paginated users with optional role filtering */
  getAllUsers: PaginatedUsers;
  /** Fetches the current authenticated user */
  getCurrentAuthUser: AuthUser;
  /** Fetches departments by label and their doctors */
  getDoctorByDepartment: Array<Department>;
  /** Fetches all users with the role of doctor */
  getDoctors: Array<User>;
  patient: Patient;
  patients: Array<Patient>;
  restrictedConsultationsByDoctorId: Array<Consultation>;
  restrictedPatients: Array<Patient>;
  roles: Array<Role>;
  users: Array<User>;
};

export type QueryConsultationsByDoctorIdArgs = {
  doctorId: Scalars['String']['input'];
};

export type QueryDossierArgs = {
  patientId: Scalars['String']['input'];
};

export type QueryGetAllUsersArgs = {
  roleCode?: InputMaybe<Scalars['String']['input']>;
  searchByName?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type QueryGetDoctorByDepartmentArgs = {
  label: Scalars['String']['input'];
};

export type QueryPatientArgs = {
  patientId: Scalars['String']['input'];
};

export type QueryPatientsArgs = {
  search: Scalars['String']['input'];
};

export type QueryRestrictedConsultationsByDoctorIdArgs = {
  doctorId: Scalars['String']['input'];
};

export type QueryRestrictedPatientsArgs = {
  search: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  code: RoleCode;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

/** The roles available to a user */
export enum RoleCode {
  Admin = 'ADMIN',
  Agent = 'AGENT',
  Doctor = 'DOCTOR',
  Secretary = 'SECRETARY'
}

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
  id: Scalars['String']['output'];
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

export type DepartmentsAndGendersAndRolesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DepartmentsAndGendersAndRolesQuery = {
  __typename?: 'Query';
  genders: Array<{ __typename?: 'Gender'; id: number; label: string }>;
  departments: Array<{ __typename?: 'Department'; id: number; label: string }>;
  roles: Array<{
    __typename?: 'Role';
    id: number;
    label: string;
    code: RoleCode;
  }>;
};

export type RestrictedConsultationsByDoctorIdQueryVariables = Exact<{
  doctorId: Scalars['String']['input'];
}>;

export type RestrictedConsultationsByDoctorIdQuery = {
  __typename?: 'Query';
  restrictedConsultationsByDoctorId: Array<{
    __typename?: 'Consultation';
    startTime: string;
    consultationDate: any;
    doctor: {
      __typename?: 'User';
      firstname: string;
      department?: { __typename?: 'Department'; label: string } | null;
    };
    patient: { __typename?: 'Patient'; firstname: string; lastname: string };
  }>;
};

export type DepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type DepartmentsQuery = {
  __typename?: 'Query';
  departments: Array<{ __typename?: 'Department'; id: number; label: string }>;
};

export type DepartmentsWithDoctorsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DepartmentsWithDoctorsQuery = {
  __typename?: 'Query';
  allDepartmentsWithDoctors: Array<{
    __typename?: 'Department';
    id: number;
    label: string;
    users: Array<{
      __typename?: 'User';
      id: string;
      firstname: string;
      lastname: string;
    }>;
  }>;
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
    id: string;
    lastname: string;
  }>;
};

export type DossierQueryVariables = Exact<{
  patientId: Scalars['String']['input'];
}>;

export type DossierQuery = {
  __typename?: 'Query';
  dossier: Array<{
    __typename?: 'Consultation';
    id: string;
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

export type GendersQueryVariables = Exact<{ [key: string]: never }>;

export type GendersQuery = {
  __typename?: 'Query';
  genders: Array<{ __typename?: 'Gender'; id: number; label: string }>;
};

export type PatientQueryVariables = Exact<{
  patientId: Scalars['String']['input'];
}>;

export type PatientQuery = {
  __typename?: 'Query';
  patient: {
    __typename?: 'Patient';
    id: string;
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
    id: string;
    firstname: string;
    lastname: string;
    ssn: string;
    dateOfBirth: any;
    gender: { __typename?: 'Gender'; label: string };
  }>;
};

export type GetRestrictedPatientsBySsnQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type GetRestrictedPatientsBySsnQuery = {
  __typename?: 'Query';
  restrictedPatients: Array<{ __typename?: 'Patient'; ssn: string }>;
};

export type RolesQueryVariables = Exact<{ [key: string]: never }>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: Array<{
    __typename?: 'Role';
    id: number;
    label: string;
    code: RoleCode;
  }>;
};

export type RolesWithUsersQueryVariables = Exact<{ [key: string]: never }>;

export type RolesWithUsersQuery = {
  __typename?: 'Query';
  roles: Array<{
    __typename?: 'Role';
    id: number;
    label: string;
    users?: Array<{
      __typename?: 'User';
      id: string;
      firstname: string;
      lastname: string;
    }> | null;
  }>;
};

export type ConsultationsByDoctorIdQueryVariables = Exact<{
  doctorId: Scalars['String']['input'];
}>;

export type ConsultationsByDoctorIdQuery = {
  __typename?: 'Query';
  consultationsByDoctorId: Array<{
    __typename?: 'Consultation';
    consultationDate: any;
    startTime: string;
    durationMinutes: number;
    description: string;
    id: string;
    patient: {
      __typename?: 'Patient';
      firstname: string;
      lastname: string;
      id: string;
    };
    subject: { __typename?: 'ConsultationSubject'; label: string; id: number };
  }>;
};

export type ConsultationSubjectsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ConsultationSubjectsQuery = {
  __typename?: 'Query';
  consultationSubjects: Array<{
    __typename?: 'ConsultationSubject';
    id: number;
    label: string;
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
      id: string;
    }>;
  }>;
};

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthUser';
    id: string;
    email: string;
    role: { __typename?: 'Role'; id: number; label: string; code: RoleCode };
  };
};

export type AddUserMutationVariables = Exact<{
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  roleCode: Scalars['String']['input'];
  departmentLabel?: InputMaybe<Scalars['String']['input']>;
  genderLabel?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddUserMutation = {
  __typename?: 'Mutation';
  addUser: {
    __typename?: 'User';
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt?: string | null;
    role: { __typename?: 'Role'; id: number; label: string; code: RoleCode };
    department?: {
      __typename?: 'Department';
      id: number;
      label: string;
    } | null;
    gender?: { __typename?: 'Gender'; id: number; label: string } | null;
  };
};

export type GetCurrentAuthUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentAuthUserQuery = {
  __typename?: 'Query';
  getCurrentAuthUser: {
    __typename?: 'AuthUser';
    email: string;
    id: string;
    role: { __typename?: 'Role'; id: number; code: RoleCode; label: string };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type GetAllUsersQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  roleCode?: InputMaybe<Scalars['String']['input']>;
  searchByName?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetAllUsersQuery = {
  __typename?: 'Query';
  getAllUsers: {
    __typename?: 'PaginatedUsers';
    total: number;
    hasMore: boolean;
    users: Array<{
      __typename?: 'User';
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      role: { __typename?: 'Role'; code: RoleCode; label: string };
      department?: {
        __typename?: 'Department';
        label: string;
        id: number;
      } | null;
      gender?: { __typename?: 'Gender'; id: number; label: string } | null;
    }>;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  genderLabel?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender?: { __typename?: 'Gender'; id: number; label: string } | null;
  };
};

export const DepartmentsAndGendersAndRolesDocument = gql`
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
      code
    }
  }
`;

/**
 * __useDepartmentsAndGendersAndRolesQuery__
 *
 * To run a query within a React component, call `useDepartmentsAndGendersAndRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsAndGendersAndRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsAndGendersAndRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsAndGendersAndRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DepartmentsAndGendersAndRolesQuery,
    DepartmentsAndGendersAndRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    DepartmentsAndGendersAndRolesQuery,
    DepartmentsAndGendersAndRolesQueryVariables
  >(DepartmentsAndGendersAndRolesDocument, options);
}
export function useDepartmentsAndGendersAndRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DepartmentsAndGendersAndRolesQuery,
    DepartmentsAndGendersAndRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    DepartmentsAndGendersAndRolesQuery,
    DepartmentsAndGendersAndRolesQueryVariables
  >(DepartmentsAndGendersAndRolesDocument, options);
}
export function useDepartmentsAndGendersAndRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        DepartmentsAndGendersAndRolesQuery,
        DepartmentsAndGendersAndRolesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    DepartmentsAndGendersAndRolesQuery,
    DepartmentsAndGendersAndRolesQueryVariables
  >(DepartmentsAndGendersAndRolesDocument, options);
}
export type DepartmentsAndGendersAndRolesQueryHookResult = ReturnType<
  typeof useDepartmentsAndGendersAndRolesQuery
>;
export type DepartmentsAndGendersAndRolesLazyQueryHookResult = ReturnType<
  typeof useDepartmentsAndGendersAndRolesLazyQuery
>;
export type DepartmentsAndGendersAndRolesSuspenseQueryHookResult = ReturnType<
  typeof useDepartmentsAndGendersAndRolesSuspenseQuery
>;
export type DepartmentsAndGendersAndRolesQueryResult = Apollo.QueryResult<
  DepartmentsAndGendersAndRolesQuery,
  DepartmentsAndGendersAndRolesQueryVariables
>;
export const RestrictedConsultationsByDoctorIdDocument = gql`
  query RestrictedConsultationsByDoctorId($doctorId: String!) {
    restrictedConsultationsByDoctorId(doctorId: $doctorId) {
      doctor {
        firstname
        department {
          label
        }
      }
      patient {
        firstname
        lastname
      }
      startTime
      consultationDate
    }
  }
`;

/**
 * __useRestrictedConsultationsByDoctorIdQuery__
 *
 * To run a query within a React component, call `useRestrictedConsultationsByDoctorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestrictedConsultationsByDoctorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestrictedConsultationsByDoctorIdQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *   },
 * });
 */
export function useRestrictedConsultationsByDoctorIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    RestrictedConsultationsByDoctorIdQuery,
    RestrictedConsultationsByDoctorIdQueryVariables
  > &
    (
      | {
          variables: RestrictedConsultationsByDoctorIdQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    RestrictedConsultationsByDoctorIdQuery,
    RestrictedConsultationsByDoctorIdQueryVariables
  >(RestrictedConsultationsByDoctorIdDocument, options);
}
export function useRestrictedConsultationsByDoctorIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RestrictedConsultationsByDoctorIdQuery,
    RestrictedConsultationsByDoctorIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    RestrictedConsultationsByDoctorIdQuery,
    RestrictedConsultationsByDoctorIdQueryVariables
  >(RestrictedConsultationsByDoctorIdDocument, options);
}
export function useRestrictedConsultationsByDoctorIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        RestrictedConsultationsByDoctorIdQuery,
        RestrictedConsultationsByDoctorIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    RestrictedConsultationsByDoctorIdQuery,
    RestrictedConsultationsByDoctorIdQueryVariables
  >(RestrictedConsultationsByDoctorIdDocument, options);
}
export type RestrictedConsultationsByDoctorIdQueryHookResult = ReturnType<
  typeof useRestrictedConsultationsByDoctorIdQuery
>;
export type RestrictedConsultationsByDoctorIdLazyQueryHookResult = ReturnType<
  typeof useRestrictedConsultationsByDoctorIdLazyQuery
>;
export type RestrictedConsultationsByDoctorIdSuspenseQueryHookResult =
  ReturnType<typeof useRestrictedConsultationsByDoctorIdSuspenseQuery>;
export type RestrictedConsultationsByDoctorIdQueryResult = Apollo.QueryResult<
  RestrictedConsultationsByDoctorIdQuery,
  RestrictedConsultationsByDoctorIdQueryVariables
>;
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
export const DepartmentsWithDoctorsDocument = gql`
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

/**
 * __useDepartmentsWithDoctorsQuery__
 *
 * To run a query within a React component, call `useDepartmentsWithDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsWithDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsWithDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsWithDoctorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DepartmentsWithDoctorsQuery,
    DepartmentsWithDoctorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    DepartmentsWithDoctorsQuery,
    DepartmentsWithDoctorsQueryVariables
  >(DepartmentsWithDoctorsDocument, options);
}
export function useDepartmentsWithDoctorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DepartmentsWithDoctorsQuery,
    DepartmentsWithDoctorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    DepartmentsWithDoctorsQuery,
    DepartmentsWithDoctorsQueryVariables
  >(DepartmentsWithDoctorsDocument, options);
}
export function useDepartmentsWithDoctorsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        DepartmentsWithDoctorsQuery,
        DepartmentsWithDoctorsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    DepartmentsWithDoctorsQuery,
    DepartmentsWithDoctorsQueryVariables
  >(DepartmentsWithDoctorsDocument, options);
}
export type DepartmentsWithDoctorsQueryHookResult = ReturnType<
  typeof useDepartmentsWithDoctorsQuery
>;
export type DepartmentsWithDoctorsLazyQueryHookResult = ReturnType<
  typeof useDepartmentsWithDoctorsLazyQuery
>;
export type DepartmentsWithDoctorsSuspenseQueryHookResult = ReturnType<
  typeof useDepartmentsWithDoctorsSuspenseQuery
>;
export type DepartmentsWithDoctorsQueryResult = Apollo.QueryResult<
  DepartmentsWithDoctorsQuery,
  DepartmentsWithDoctorsQueryVariables
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
  query Dossier($patientId: String!) {
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
export const GendersDocument = gql`
  query Genders {
    genders {
      id
      label
    }
  }
`;

/**
 * __useGendersQuery__
 *
 * To run a query within a React component, call `useGendersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGendersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGendersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGendersQuery(
  baseOptions?: Apollo.QueryHookOptions<GendersQuery, GendersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GendersQuery, GendersQueryVariables>(
    GendersDocument,
    options
  );
}
export function useGendersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GendersQuery, GendersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GendersQuery, GendersQueryVariables>(
    GendersDocument,
    options
  );
}
export function useGendersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GendersQuery, GendersQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GendersQuery, GendersQueryVariables>(
    GendersDocument,
    options
  );
}
export type GendersQueryHookResult = ReturnType<typeof useGendersQuery>;
export type GendersLazyQueryHookResult = ReturnType<typeof useGendersLazyQuery>;
export type GendersSuspenseQueryHookResult = ReturnType<
  typeof useGendersSuspenseQuery
>;
export type GendersQueryResult = Apollo.QueryResult<
  GendersQuery,
  GendersQueryVariables
>;
export const PatientDocument = gql`
  query Patient($patientId: String!) {
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
      ssn
      dateOfBirth
      gender {
        label
      }
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
export const GetRestrictedPatientsBySsnDocument = gql`
  query GetRestrictedPatientsBySsn($search: String!) {
    restrictedPatients(search: $search) {
      ssn
    }
  }
`;

/**
 * __useGetRestrictedPatientsBySsnQuery__
 *
 * To run a query within a React component, call `useGetRestrictedPatientsBySsnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestrictedPatientsBySsnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestrictedPatientsBySsnQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetRestrictedPatientsBySsnQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRestrictedPatientsBySsnQuery,
    GetRestrictedPatientsBySsnQueryVariables
  > &
    (
      | { variables: GetRestrictedPatientsBySsnQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRestrictedPatientsBySsnQuery,
    GetRestrictedPatientsBySsnQueryVariables
  >(GetRestrictedPatientsBySsnDocument, options);
}
export function useGetRestrictedPatientsBySsnLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRestrictedPatientsBySsnQuery,
    GetRestrictedPatientsBySsnQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRestrictedPatientsBySsnQuery,
    GetRestrictedPatientsBySsnQueryVariables
  >(GetRestrictedPatientsBySsnDocument, options);
}
export function useGetRestrictedPatientsBySsnSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetRestrictedPatientsBySsnQuery,
        GetRestrictedPatientsBySsnQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetRestrictedPatientsBySsnQuery,
    GetRestrictedPatientsBySsnQueryVariables
  >(GetRestrictedPatientsBySsnDocument, options);
}
export type GetRestrictedPatientsBySsnQueryHookResult = ReturnType<
  typeof useGetRestrictedPatientsBySsnQuery
>;
export type GetRestrictedPatientsBySsnLazyQueryHookResult = ReturnType<
  typeof useGetRestrictedPatientsBySsnLazyQuery
>;
export type GetRestrictedPatientsBySsnSuspenseQueryHookResult = ReturnType<
  typeof useGetRestrictedPatientsBySsnSuspenseQuery
>;
export type GetRestrictedPatientsBySsnQueryResult = Apollo.QueryResult<
  GetRestrictedPatientsBySsnQuery,
  GetRestrictedPatientsBySsnQueryVariables
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
export const ConsultationsByDoctorIdDocument = gql`
  query ConsultationsByDoctorId($doctorId: String!) {
    consultationsByDoctorId(doctorId: $doctorId) {
      consultationDate
      startTime
      durationMinutes
      description
      id
      patient {
        firstname
        lastname
        id
      }
      subject {
        label
        id
      }
    }
  }
`;

/**
 * __useConsultationsByDoctorIdQuery__
 *
 * To run a query within a React component, call `useConsultationsByDoctorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsultationsByDoctorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsultationsByDoctorIdQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *   },
 * });
 */
export function useConsultationsByDoctorIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ConsultationsByDoctorIdQuery,
    ConsultationsByDoctorIdQueryVariables
  > &
    (
      | { variables: ConsultationsByDoctorIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ConsultationsByDoctorIdQuery,
    ConsultationsByDoctorIdQueryVariables
  >(ConsultationsByDoctorIdDocument, options);
}
export function useConsultationsByDoctorIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConsultationsByDoctorIdQuery,
    ConsultationsByDoctorIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ConsultationsByDoctorIdQuery,
    ConsultationsByDoctorIdQueryVariables
  >(ConsultationsByDoctorIdDocument, options);
}
export function useConsultationsByDoctorIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ConsultationsByDoctorIdQuery,
        ConsultationsByDoctorIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ConsultationsByDoctorIdQuery,
    ConsultationsByDoctorIdQueryVariables
  >(ConsultationsByDoctorIdDocument, options);
}
export type ConsultationsByDoctorIdQueryHookResult = ReturnType<
  typeof useConsultationsByDoctorIdQuery
>;
export type ConsultationsByDoctorIdLazyQueryHookResult = ReturnType<
  typeof useConsultationsByDoctorIdLazyQuery
>;
export type ConsultationsByDoctorIdSuspenseQueryHookResult = ReturnType<
  typeof useConsultationsByDoctorIdSuspenseQuery
>;
export type ConsultationsByDoctorIdQueryResult = Apollo.QueryResult<
  ConsultationsByDoctorIdQuery,
  ConsultationsByDoctorIdQueryVariables
>;
export const ConsultationSubjectsDocument = gql`
  query ConsultationSubjects {
    consultationSubjects {
      id
      label
    }
  }
`;

/**
 * __useConsultationSubjectsQuery__
 *
 * To run a query within a React component, call `useConsultationSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConsultationSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConsultationSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConsultationSubjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ConsultationSubjectsQuery,
    ConsultationSubjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ConsultationSubjectsQuery,
    ConsultationSubjectsQueryVariables
  >(ConsultationSubjectsDocument, options);
}
export function useConsultationSubjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ConsultationSubjectsQuery,
    ConsultationSubjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ConsultationSubjectsQuery,
    ConsultationSubjectsQueryVariables
  >(ConsultationSubjectsDocument, options);
}
export function useConsultationSubjectsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ConsultationSubjectsQuery,
        ConsultationSubjectsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ConsultationSubjectsQuery,
    ConsultationSubjectsQueryVariables
  >(ConsultationSubjectsDocument, options);
}
export type ConsultationSubjectsQueryHookResult = ReturnType<
  typeof useConsultationSubjectsQuery
>;
export type ConsultationSubjectsLazyQueryHookResult = ReturnType<
  typeof useConsultationSubjectsLazyQuery
>;
export type ConsultationSubjectsSuspenseQueryHookResult = ReturnType<
  typeof useConsultationSubjectsSuspenseQuery
>;
export type ConsultationSubjectsQueryResult = Apollo.QueryResult<
  ConsultationSubjectsQuery,
  ConsultationSubjectsQueryVariables
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
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      email
      role {
        id
        label
        code
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const AddUserDocument = gql`
  mutation AddUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $roleCode: String!
    $departmentLabel: String
    $genderLabel: String
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      roleCode: $roleCode
      departmentLabel: $departmentLabel
      genderLabel: $genderLabel
    ) {
      id
      firstname
      lastname
      email
      role {
        id
        label
        code
      }
      department {
        id
        label
      }
      gender {
        id
        label
      }
      createdAt
    }
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      roleCode: // value for 'roleCode'
 *      departmentLabel: // value for 'departmentLabel'
 *      genderLabel: // value for 'genderLabel'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
export const GetCurrentAuthUserDocument = gql`
  query GetCurrentAuthUser {
    getCurrentAuthUser {
      email
      id
      role {
        id
        code
        label
      }
    }
  }
`;

/**
 * __useGetCurrentAuthUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentAuthUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentAuthUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentAuthUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentAuthUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentAuthUserQuery,
    GetCurrentAuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentAuthUserQuery,
    GetCurrentAuthUserQueryVariables
  >(GetCurrentAuthUserDocument, options);
}
export function useGetCurrentAuthUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentAuthUserQuery,
    GetCurrentAuthUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentAuthUserQuery,
    GetCurrentAuthUserQueryVariables
  >(GetCurrentAuthUserDocument, options);
}
export function useGetCurrentAuthUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentAuthUserQuery,
        GetCurrentAuthUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentAuthUserQuery,
    GetCurrentAuthUserQueryVariables
  >(GetCurrentAuthUserDocument, options);
}
export type GetCurrentAuthUserQueryHookResult = ReturnType<
  typeof useGetCurrentAuthUserQuery
>;
export type GetCurrentAuthUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentAuthUserLazyQuery
>;
export type GetCurrentAuthUserSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentAuthUserSuspenseQuery
>;
export type GetCurrentAuthUserQueryResult = Apollo.QueryResult<
  GetCurrentAuthUserQuery,
  GetCurrentAuthUserQueryVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const GetAllUsersDocument = gql`
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
        department {
          label
          id
        }
        gender {
          id
          label
        }
      }
      total
      hasMore
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
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      roleCode: // value for 'roleCode'
 *      searchByName: // value for 'searchByName'
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  > &
    (
      | { variables: GetAllUsersQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
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
export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      genderLabel: // value for 'genderLabel'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
