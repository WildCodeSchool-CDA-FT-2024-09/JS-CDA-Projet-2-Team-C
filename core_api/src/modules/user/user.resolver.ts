import { Resolver, Mutation, Arg } from 'type-graphql';
import { User, Role, Department, Gender } from '../entities.index';
import * as dotenv from 'dotenv';

dotenv.config();

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async addUser(
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('roleLabel') roleLabel: string,
    @Arg('departmentLabel', { nullable: true }) departmentLabel: string,
    @Arg('genderLabel', { nullable: true }) genderLabel: string
  ): Promise<User> {
    try {
      const hashedPassword = process.env.TEST_USER_PASSWORD;

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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to add user: ${error.message}`);
      } else {
        throw new Error('Failed to add user due to an unknown error');
      }
    }
  }
}
