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
  // TODO : limit the number of results ?

  // needed to browse patients by their first or lastname, case insensitive
  @Query(() => [Patient])
  async patients(@Arg('search') search: string) {
    search = search.trim();
    if (!search) return [];
    return await Patient.find({
      where: [
        { firstname: ILike(`${search}%`) },
        { lastname: ILike(`${search}%`) }
      ],
      relations: {
        gender: true
      }
    });
  }
}
