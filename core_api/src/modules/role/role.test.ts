import getSchema from '../../schema';
import { graphql, GraphQLSchema, print } from 'graphql';
import gql from 'graphql-tag';

const GET_ROLES = gql`
  query TestRoleQuery {
    roles {
      id
      label
      code
    }
  }
`;

describe('Repo resolvers', () => {
  let schema: GraphQLSchema;
  beforeAll(async () => {
    schema = await getSchema();
  });
  it('get all repos', async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_ROLES)
    })) as { data: { roles: Array<unknown> } };
    expect(result.data.roles).toEqual(expect.any(Array));
  });
});
