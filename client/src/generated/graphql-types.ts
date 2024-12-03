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
  DateTimeISO: { input: Date; output: Date };
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

export type Consultation = {
  __typename?: 'Consultation';
  attachments: Array<Attachment>;
  author: User;
  consultationDate: Scalars['DateTimeISO']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  doctor: User;
  durationMinutes: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  patient: Patient;
  startTime: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
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
  dateOfBirth: Scalars['DateTimeISO']['output'];
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
  dossier: Array<Consultation>;
  roles: Array<Role>;
};

export type QueryDossierArgs = {
  patientId: Scalars['Float']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  attachmentsCreated: Array<Attachment>;
  consultationsCreated: Array<Consultation>;
  createdAt: Scalars['String']['output'];
  department: Department;
  doctorConsultations: Array<Consultation>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  isArchived: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['String']['output'];
  workingHours: Array<WorkingHours>;
};

export type WorkingHours = {
  __typename?: 'WorkingHours';
  endTime: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['String']['output'];
  weekday: Scalars['Int']['output'];
};

export type DossierQueryVariables = Exact<{
  patientId: Scalars['Float']['input'];
}>;

export type DossierQuery = {
  __typename?: 'Query';
  dossier: Array<{
    __typename?: 'Consultation';
    consultationDate: Date;
    description: string;
    patient: {
      __typename?: 'Patient';
      firstname: string;
      lastname: string;
      dateOfBirth: Date;
      ssn: string;
      postcode: string;
      town: string;
      gender: { __typename?: 'Gender'; label: string };
    };
    doctor: {
      __typename?: 'User';
      firstname: string;
      lastname: string;
      department: { __typename?: 'Department'; label: string; id: number };
    };
    attachments: Array<{
      __typename?: 'Attachment';
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

export type RolesQueryVariables = Exact<{ [key: string]: never }>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: Array<{ __typename?: 'Role'; id: number; label: string }>;
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

export const DossierDocument = gql`
  query Dossier($patientId: Float!) {
    dossier(patientId: $patientId) {
      patient {
        firstname
        lastname
        gender {
          label
        }
        dateOfBirth
        ssn
        postcode
        town
      }
      consultationDate
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
export const RolesDocument = gql`
  query Roles {
    roles {
      id
      label
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
