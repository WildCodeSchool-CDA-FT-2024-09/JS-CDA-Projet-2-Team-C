import { Resolver, Query, Arg, Authorized } from 'type-graphql';
import { ILike, Raw } from 'typeorm';
import { Patient, RoleCode } from '../entities.index';

@Resolver(Patient)
export default class PatientResolver {
  @Authorized([RoleCode.DOCTOR, RoleCode.SECRETARY])
  @Query(() => Patient)
  async patient(@Arg('patientId') patientId: string) {
    return await Patient.findOne({
      where: { id: patientId },
      relations: {
        gender: true
      }
    });
  }

  // needed to browse patients by their firstname,lastname or SSN, case insensitive
  @Query(() => [Patient])
  @Authorized([RoleCode.DOCTOR, RoleCode.SECRETARY])
  async patients(@Arg('search') search: string) {
    search = search.trim();
    if (!search) return [];
    return await Patient.find({
      where: [
        { firstname: ILike(`${search}%`) },
        { lastname: ILike(`${search}%`) },
        {
          ssn: Raw((ssn) => `REPLACE(${ssn}, ' ', '') LIKE :search`, {
            search: `${search}%`
          })
        }
      ],
      take: 10,
      relations: {
        gender: true
      }
    });
  }

  @Query(() => [Patient])
  async restrictedPatients(@Arg('search') search: string) {
    search = search.trim();
    if (!search) return [];
    return await Patient.find({
      where: [
        {
          ssn: Raw((alias) => `REPLACE(${alias}, ' ', '') LIKE :search`, {
            search: `${search.replace(/\s+/g, '')}%`
          })
        }
      ]
    });
  }
}
