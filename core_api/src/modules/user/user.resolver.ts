import { Query, Resolver, Arg } from 'type-graphql';
import { verifyPassword, generateToken } from '../../utils/auth.utils';
import { User, AuthUser } from './user.entity';

@Resolver()
export default class UserResolver {
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
