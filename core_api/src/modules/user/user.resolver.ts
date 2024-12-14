import * as dotenv from 'dotenv';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import {
  User,
  AuthUser,
  Role,
  Department,
  Gender,
  RoleLabel
} from '../entities.index';
import { verifyPassword, generateToken } from '../../utils/auth.utils';
import { hashPassword } from '../../utils/auth.utils';
dotenv.config();

@Resolver(User)
export default class UserResolver {
  @Query(() => [User], {
    description: 'Fetches all users with the role of doctor'
  })
  async getDoctors(): Promise<User[]> {
    const doctorRole = await Role.findOne({
      where: { label: RoleLabel.DOCTOR }
    });
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
    const doctorRole = await Role.findOne({
      where: { label: RoleLabel.DOCTOR }
    });
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

  @Mutation(() => User)
  async addUser(
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('roleLabel') roleLabel: RoleLabel,
    @Arg('departmentLabel', { nullable: true }) departmentLabel: string,
    @Arg('genderLabel', { nullable: true }) genderLabel: string
  ): Promise<User> {
    const password = process.env.TEST_USER_PASSWORD || '';

    const hashedPassword = await hashPassword(password);

    const duplicateUser = await User.findOne({ where: { email: email } });
    if (duplicateUser) throw new Error('Cet email est déjà utilisé');

    const role = await Role.findOne({ where: { label: roleLabel } });
    if (!role) throw new Error('Role not found');

    let gender = undefined;
    if (genderLabel) {
      gender = await Gender.findOne({ where: { label: genderLabel } });
      if (!gender) throw new Error('Gender not found');
    }

    let department = undefined;
    if (departmentLabel) {
      department = await Department.findOne({
        where: { label: departmentLabel }
      });
      if (!department) throw new Error('Department not found');
    }

    const user = User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      department,
      gender,
      isArchived: false
    });

    await user.save();
    return user;
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

  @Query(() => [User])
  async users() {
    return await User.find({
      relations: ['role', 'department', 'gender'] // Explicitly load the "role" relationship
    });
  }
}
