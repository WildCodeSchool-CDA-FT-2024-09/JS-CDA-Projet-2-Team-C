import { User } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find({
      relations: ['role', 'department', 'gender'] // Charge explicitement la relation "role"
    });
  }
}
