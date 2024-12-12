import getSchema from '../../schema';
import { graphql, GraphQLSchema, print } from 'graphql';
import gql from 'graphql-tag';

export const GET_PATIENTS_BY_NAME = gql`
  query GetPatientsByName($search: String!) {
    patients(search: $search) {
      id
      firstname
      lastname
    }
  }
`;

describe('Patient resolver', () => {
  let schema: GraphQLSchema;
  beforeAll(async () => {
    schema = await getSchema();
  });
  // Intended functionnality
  it('can search for patients by name', async () => {
    const searchValue = 'pen';
    const expectedResult = {
      firstname: 'Penelope',
      id: 2,
      lastname: 'Patient'
    };
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients).toContainEqual(expectedResult);
  });

  it('results aren t affected by case ', async () => {
    const searchValue = 'PeNel';
    const expectedResult = {
      firstname: 'Penelope',
      id: 2,
      lastname: 'Patient'
    };
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients).toContainEqual(expectedResult);
  });

  // Edge cases
  it('returns an empty array if no patient was found', async () => {
    const searchValue = 'noPatientMatchesThisString';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients.length).toEqual(0);
  });

  it('resists basic SQLi', async () => {
    const searchValue = "' OR 1=1 --";
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients.length).toEqual(0);
  });

  it('can handle empty searches', async () => {
    const searchValue = '';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    console.info(result.data.patients);

    expect(result.data.patients.length).toEqual(0);
  });
});
