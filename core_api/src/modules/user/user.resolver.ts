import * as dotenv from 'dotenv';
import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql';
import {
  User,
  AuthUser,
  Role,
  Department,
  Gender,
  RoleCode,
  PaginatedUsers
  // WorkingHours
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
      where: { code: RoleCode.DOCTOR }
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
      where: { code: RoleCode.DOCTOR }
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
    @Arg('roleCode') roleCode: RoleCode,
    @Arg('departmentLabel', { nullable: true }) departmentLabel: string,
    @Arg('genderLabel', { nullable: true }) genderLabel: string
  ): Promise<User> {
    const password = process.env.TEST_USER_PASSWORD || '';

    const hashedPassword = await hashPassword(password);

    const duplicateUser = await User.findOne({ where: { email: email } });
    if (duplicateUser) throw new Error('Cet email est déjà utilisé');

    const role = await Role.findOne({ where: { code: roleCode } });
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
      // Explicitly load the "role" relationship
      relations: ['role', 'department', 'gender']
    });
  }

  @Query(() => PaginatedUsers, {
    description: 'Fetch paginated users with optional role filtering'
  })
  async getAllUsers(
    @Arg('skip', () => Int) skip: number,
    @Arg('take', () => Int) take: number,
    @Arg('roleCode', { nullable: true }) roleCode?: string,
    @Arg('searchByName', { nullable: true }) searchByName?: string
  ): Promise<PaginatedUsers> {
    const queryBuilder = User.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.department', 'department')
      .leftJoinAndSelect('user.gender', 'gender')
      .leftJoinAndSelect('user.workingHours', 'workingHours')
      .skip(skip)
      .take(take);

    // Filtering by role if roleCode is set
    if (roleCode) {
      queryBuilder.where('role.code = :roleCode', { roleCode });
    }

    if (searchByName) {
      queryBuilder.andWhere(
        '(user.firstname ILIKE :search OR user.lastname ILIKE :search)',
        { search: `%${searchByName}%` }
      );
    }

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      users,
      total,
      hasMore: skip + take < total
    };
  }

  @Query(() => User, {
    description: 'Fetch a doctor by ID with their working hours'
  })
  async getDoctorById(@Arg('id', () => Int) id: number): Promise<User | null> {
    const doctor = await User.findOne({
      where: { id },
      relations: ['role', 'workingHours']
    });

    if (!doctor || doctor.role.code !== RoleCode.DOCTOR) {
      throw new Error('Doctor not found or not a doctor');
    }

    return doctor;
  }
}
