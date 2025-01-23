import getSchema from '../../schema';
import { graphql, GraphQLSchema, print, ExecutionResult } from 'graphql';
import gql from 'graphql-tag';
import { RoleCode } from '../entities.index';
import { MockUser } from '../../types/MockUserType';

export const CREATE_CONSULTATION = gql`
  mutation CreateConsultation($consultationDetails: CreateConsultationInput!) {
    createConsultation(consultationDetails: $consultationDetails) {
      id
    }
  }
`;

const mockUser: MockUser = {
  id: 'affa2e42-5b4b-4ccd-b977-a612cb89192b',
  role: {
    code: null // to change for each test
  }
};

const contextValue = {
  user: mockUser
};

const validConsultationDetails = {
  doctorId: 'aa0032bc-7ac2-431f-9d3a-41df0024edd3', // these are hard-coded into the seed script
  patientId: '619871ac-4e94-47a1-bc43-ad9a2bce827a',
  subjectLabel: 'Routine check-up',
  description: 'this consultation is only a test',
  start: '2025-01-01T10:00:00Z',
  end: '2025-02-01T12:00:00Z' // this is hard-coded to avoid flaky behaviour in the future when more checks are implemented
};

describe('Consultation Resolver', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  // Intended functionnality
  // Role access checks
  it('Can create consultations as a SECRETARY', async () => {
    mockUser.role.code = RoleCode.SECRETARY;

    const result: ExecutionResult = (await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: validConsultationDetails
      }
    })) as {
      data: {
        createConsultation: { id: string };
      };
    };

    // Assert that the consultation was created successfully
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    expect(result.data?.createConsultation).toHaveProperty('id');
  });

  it('Cannot create consultations if not logged in', async () => {
    mockUser.role.code = null;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: validConsultationDetails
      }
    });

    expect(result.errors).toEqual(expect.any(Array)); //TODO : make this more specific and check for unauthorized status and NO StackTRACE
    expect(result.data).toBeNull();
  });

  it('Cannot create consultations as an AGENT', async () => {
    mockUser.role.code = RoleCode.AGENT;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: validConsultationDetails
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  // Data validation

  it('Will not allow misformated start date input', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          ...validConsultationDetails,
          start: '16 janvier 2011 10h'
        }
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  it('Will not allow misformated end date input', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          ...validConsultationDetails,
          end: '16 janvier 2011 10h'
        }
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  it('Will not allow misformated doctorId input', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          ...validConsultationDetails,
          doctorId: '4565464sdfsd-sdfsdf74'
        }
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  it('Will not allow misformated patientID input', async () => {
    mockUser.role.code = RoleCode.SECRETARY;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          ...validConsultationDetails,
          patientId: '4565464sdfsd-sdfsdf74'
        }
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });
});
