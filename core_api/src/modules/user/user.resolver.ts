import { User, Role, Department, AuthUser } from '../entities.index';
import { verifyPassword, generateToken } from '../../utils/auth.utils';
import { Resolver, Query, Arg } from 'type-graphql';

@Resolver(User)
export default class UserResolver {
  @Query(() => [User], {
    description: 'Fetches all users with the role of doctor'
  })
  async getDoctors(): Promise<User[]> {
    const doctorRole = await Role.findOne({ where: { label: 'doctor' } });
    if (!doctorRole) {
      throw new Error("Role 'doctor' not found.");
    }

    const doctors = await User.find({
      where: { role: doctorRole },
      relations: ['role', 'department', 'gender', 'workingHours']
    });

    return doctors;
  }
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
  @Query(() => AuthUser)
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await User.findOne({ where: { email }, relations: ['role'] });

    if (!user || !(await verifyPassword(password, user.password))) {
      throw new Error(`L'email ou le mot de passe est incorrect`);
    }

    const authUser = new AuthUser();

    authUser.id = user.id;
    authUser.email = user.email;
    authUser.role = user.role;
    authUser.token = generateToken(user);

    return authUser;
  }
}
