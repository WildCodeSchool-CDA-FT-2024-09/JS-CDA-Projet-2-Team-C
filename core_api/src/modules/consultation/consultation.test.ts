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

// variableValues: { consultationDetails: {
//   description: details?.description,
//   end: consultationDateTime?.end.toISOString() as string,
//   start: consultationDateTime?.start.toISOString() as string,
//   doctorId: doctorId,
//   patientId: patientId,
//   subjectLabel: details.subject
// } }

const mockUser: MockUser = {
  id: '1',
  role: {
    code: null // to change for each test
  }
};

const contextValue = {
  user: mockUser
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
    const expectedResult = {
      firstname: 'Penelope',
      lastname: 'Patient'
    };

    const result: ExecutionResult = (await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          description: 'test description',
          end: 'test description',
          start: 'test description',
          doctorId: 'test description',
          patientId: 'test description',
          subjectLabel: 'test description'
        }
      }
    })) as {
      data: {
        patients: Array<{ id: string; firstname: string; lastname: string }>;
      };
    };

    expect(result.data?.patients).toContainEqual(
      expect.objectContaining(expectedResult)
    );
    (
      result.data?.patients as Array<{
        id: string;
        firstname: string;
        lastname: string;
      }>
    ).forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(typeof patient.id).toBe('string');
    });
  });

  it('Cannot create consultations if not logged in', async () => {
    mockUser.role.code = null;
    const result: ExecutionResult = await graphql({
      schema: schema,
      source: print(CREATE_CONSULTATION),
      contextValue,
      variableValues: {
        consultationDetails: {
          description: 'test description',
          end: 'test description',
          start: 'test description',
          doctorId: 'test description',
          patientId: 'test description',
          subjectLabel: 'test description'
        }
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
        consultationDetails: {
          description: 'test description',
          end: 'test description',
          start: 'test description',
          doctorId: 'test description',
          patientId: 'test description',
          subjectLabel: 'test description'
        }
      }
    });

    expect(result.errors).toEqual(expect.any(Array));
    expect(result.data).toBeNull();
  });

  // Search functionality

  // Edge cases
});
