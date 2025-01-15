import getSchema from '../../schema';
import { graphql, GraphQLSchema, print } from 'graphql';
import gql from 'graphql-tag';
import { RoleCode } from '../entities.index';
import { MockUser } from '../../types/MockUserType';

export const GET_PATIENTS_BY_NAME = gql`
  query GetPatientsByName($search: String!) {
    patients(search: $search) {
      id
      firstname
      lastname
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

describe('Patient resolver', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  // Intended functionnality
  // Role access checks
  it('Can search for patients by name as a DOCTOR', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const searchValue = 'pen';
    const expectedResult = {
      firstname: 'Penelope',
      lastname: 'Patient'
    };
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as {
      data: {
        patients: Array<{ id: string; firstname: string; lastname: string }>;
      };
    };

    expect(result.data.patients).toContainEqual(
      expect.objectContaining(expectedResult)
    );
    result.data.patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(typeof patient.id).toBe('string');
    });
  });

  it('Can search for patients by name as a SECRETARY', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const searchValue = 'pen';
    const expectedResult = {
      firstname: 'Penelope',
      lastname: 'Patient'
    };
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as {
      data: {
        patients: Array<{ id: string; firstname: string; lastname: string }>;
      };
    };

    expect(result.data.patients).toContainEqual(
      expect.objectContaining(expectedResult)
    );
    result.data.patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(typeof patient.id).toBe('string');
    });
  });

  it('Cannot search for patients by name as an AGENT', async () => {
    mockUser.role.code = RoleCode.AGENT;
    const searchValue = 'pen';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as { errors: Array<unknown> };

    expect(result.errors).toEqual(expect.any(Array));
  });

  it('Cannot search for patients by name as an ADMIN', async () => {
    mockUser.role.code = RoleCode.ADMIN;
    const searchValue = 'pen';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as { errors: Array<unknown> };

    expect(result.errors).toEqual(expect.any(Array));
  });

  // Search functionality
  it('results aren t affected by case ', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const searchValue = 'PeNel';
    const expectedResult = {
      firstname: 'Penelope',
      lastname: 'Patient'
    };
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as {
      data: {
        patients: Array<{ id: string; firstname: string; lastname: string }>;
      };
    };

    expect(result.data.patients).toContainEqual(
      expect.objectContaining(expectedResult)
    );
    result.data.patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(typeof patient.id).toBe('string');
    });
  });

  // Edge cases
  it('returns an empty array if no patient was found', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const searchValue = 'noPatientMatchesThisString';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients.length).toEqual(0);
  });

  it('resists basic SQLi', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const searchValue = "' OR 1=1 --";
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    expect(result.data.patients.length).toEqual(0);
  });

  it('can handle empty searches', async () => {
    mockUser.role.code = RoleCode.DOCTOR;
    const searchValue = '';
    const result = (await graphql({
      schema: schema,
      source: print(GET_PATIENTS_BY_NAME),
      contextValue,
      variableValues: { search: searchValue }
    })) as { data: { patients: Array<unknown> } };

    console.info(result.data.patients);

    expect(result.data.patients.length).toEqual(0);
  });
});
