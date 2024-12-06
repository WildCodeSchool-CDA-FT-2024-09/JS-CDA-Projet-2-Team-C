import { Department, Role } from '../entities.index';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver(Department)
export default class DepartmentResolver {
  @Query(() => [Department])
  async departments() {
    return await Department.find({
      relations: ['users']
    });
  }
}
@Resolver()
export class DoctorByDepartmentResolver {
  @Query(() => [Department], {
    description: 'Récupère les départements par label et leurs docteurs'
  })
  async getDoctorByDepartment(
    @Arg('label', () => String) label: string
  ): Promise<Department[]> {
    const doctorRole = await Role.findOne({ where: { label: 'doctor' } });
    if (!doctorRole) {
      throw new Error("Role 'doctor' introuvable.");
    }
    const departments = await Department.find({
      where: { label },
      relations: ['users', 'users.role']
    });

    if (departments.length === 0) {
      throw new Error(`Aucun département trouvé avec le label '${label}'.`);
    }
    departments.forEach((department) => {
      department.users = department.users.filter(
        (user) => user.role.id === doctorRole.id
      );
    });

    return departments;
  }
}
