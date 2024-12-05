import { Resolver, Query, Arg } from 'type-graphql';
import { Patient } from '../entities.index';

@Resolver(Patient)
export default class PatientResolver {
  // TODO : rescrtict access to role === doctor | secretary
  @Query(() => Patient)
  async patient(@Arg('patientId') patientId: number) {
    return await Patient.findOne({
      where: { id: patientId },
      relations: {
        gender: true
      }
    });
  }
}
