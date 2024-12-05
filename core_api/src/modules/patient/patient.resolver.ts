import { Patient } from '../entities.index';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver(Patient)
export default class PatientResolver {
  // TODO : rescrtict access to role === doctor | secretary
  @Query(() => Patient)
  async dossier(@Arg('patientId') patientId: number) {
    return await Patient.find({
      where: { id: patientId },
      relations: {
        gender: true
      }
    });
  }
}
