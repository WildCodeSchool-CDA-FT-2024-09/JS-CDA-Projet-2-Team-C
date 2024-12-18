import { Resolver, Query, Arg } from 'type-graphql';
import { ILike } from 'typeorm';
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

  // TODO : rescrtict access to role === doctor | secretary
  // needed to browse patients by their firstname,lastname or SSN, case insensitive
  @Query(() => [Patient])
  async patients(@Arg('search') search: string) {
    search = search.trim();
    if (!search) return [];
    return await Patient.find({
      where: [
        { firstname: ILike(`${search}%`) },
        { lastname: ILike(`${search}%`) },
        { ssn: ILike(`${search}%`) }
      ],
      take: 10,
      relations: {
        gender: true
      }
    });
  }
}
