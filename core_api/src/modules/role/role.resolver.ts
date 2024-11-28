import { Role } from './role.entity';
import { Resolver, Query } from 'type-graphql';

@Resolver(Role)
export default class RoleResolver {
  @Query(() => [Role])
  async roles() {
    return await Role.find({
      relations: ['users']
    });
  }
}
