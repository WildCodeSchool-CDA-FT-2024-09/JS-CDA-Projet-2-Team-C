import getSchema from '../../schema';
import { graphql, GraphQLSchema, print, ExecutionResult } from 'graphql';
import gql from 'graphql-tag';
import { RoleCode } from '../entities.index';
import { MockUser } from '../../types/MockUserType';

const GET_DEPARTMENT = gql`
  query TestDepartmentQuery {
    departments {
      id
      label
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

describe('Department resolvers', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it('Can get all departments as an AGENT', async () => {
    mockUser.role.code = RoleCode.AGENT;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(GET_DEPARTMENT),
      contextValue
    });
    expect(result.data?.departments).toEqual(expect.any(Array));
    expect(result.errors).toBeUndefined();
  });

  it('Can get all departments as an ADMIN', async () => {
    mockUser.role.code = RoleCode.ADMIN;
    const result: ExecutionResult = (await graphql({
      schema: schema,
      source: print(GET_DEPARTMENT),
      contextValue
    })) as { data: { departments: Array<unknown> } };
    expect(result.data?.departments).toEqual(expect.any(Array));
    expect(result.errors).toBeUndefined();
  });

  it('Cannot get all departments as a SECRETARY', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(GET_DEPARTMENT),
      contextValue
    });
    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  it('Cannot get all departments as a DOCTOR', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(GET_DEPARTMENT),
      contextValue
    });
    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });
});
