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
};

export type Query = {
  __typename?: 'Query';
  roles: Array<Role>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isArchived: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['String']['output'];
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
