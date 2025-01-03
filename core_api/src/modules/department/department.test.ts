import getSchema from '../../schema';
import { graphql, GraphQLSchema, print } from 'graphql';
import gql from 'graphql-tag';

const GET_DEPARTMENT = gql`
  query TestDepartmentQuery {
    departments {
      id
      label
    }
  }
`;

describe('Department resolvers', () => {
  let schema: GraphQLSchema;
  beforeAll(async () => {
    schema = await getSchema();
  });
  it('get all department', async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_DEPARTMENT)
    })) as { data: { departments: Array<unknown> } };
    expect(result.data.departments).toEqual(expect.any(Array));
  });
});
