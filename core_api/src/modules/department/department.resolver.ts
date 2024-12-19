import { Department, Role, RoleLabel } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(Department)
export default class DepartmentResolver {
  @Query(() => [Department])
  async departments() {
    return await Department.find({
      relations: ['users']
    });
  }

  @Query(() => [Department], {
    description: 'Fetches all departments and their doctors'
  })
  async allDepartmentsWithDoctors(): Promise<Department[]> {
    const doctorRole = await Role.findOne({
      where: { label: RoleLabel.DOCTOR }
    });
    if (!doctorRole) {
      throw new Error("Role 'doctor' not found.");
    }
    const departments = await Department.find({
      relations: ['users', 'users.role']
    });

    if (departments.length === 0) {
      throw new Error(`No department found`);
    }
    departments.forEach((department) => {
      department.users = department.users.filter(
        (user) => user.role.id === doctorRole.id
      );
    });
    return departments;
  }
}
