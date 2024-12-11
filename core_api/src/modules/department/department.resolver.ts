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
    description: 'Fetches departments by label and their doctors'
  })
  async getDoctorByDepartment(
    @Arg('label', () => String) label: string
  ): Promise<Department[]> {
    const doctorRole = await Role.findOne({ where: { label: 'doctor' } });
    if (!doctorRole) {
      throw new Error("Role 'doctor' not found.");
    }
    const departments = await Department.find({
      where: { label },
      relations: ['users', 'users.role']
    });

    if (departments.length === 0) {
      throw new Error(`No department found with the label  '${label}'.`);
    }
    departments.forEach((department) => {
      department.users = department.users.filter(
        (user) => user.role.id === doctorRole.id
      );
    });

    return departments;
  }
}
