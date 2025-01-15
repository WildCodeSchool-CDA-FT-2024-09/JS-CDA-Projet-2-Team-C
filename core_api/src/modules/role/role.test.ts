import getSchema from '../../schema';
import { graphql, GraphQLSchema, print, ExecutionResult } from 'graphql';
import gql from 'graphql-tag';
import { RoleCode } from '../entities.index';
import { MockUser } from '../../types/MockUserType';

const GET_ROLES = gql`
  query TestRoleQuery {
    roles {
      id
      label
      code
    }
  }
`;

const mockUser: MockUser = {
  id: '1',
  role: {
    code: null // to change for each test
  }
};

const contextValue = {
  user: mockUser
};

describe('Repo resolvers', () => {
  let schema: GraphQLSchema;
  beforeAll(async () => {
    schema = await getSchema();
  });

  it('Can get all roles as an ADMIN', async () => {
    mockUser.role.code = RoleCode.ADMIN;
    const result: ExecutionResult = (await graphql({
      schema: schema,
      source: print(GET_ROLES),
      contextValue
    })) as { data: { roles: Array<unknown> } };
    expect(result.data?.roles).toEqual(expect.any(Array));
  });
});
