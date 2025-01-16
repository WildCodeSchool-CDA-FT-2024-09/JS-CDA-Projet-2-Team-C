import { Role, RoleCode } from '../entities.index';
import { Resolver, Query, Authorized } from 'type-graphql';

@Resolver(Role)
export default class RoleResolver {
  @Authorized([RoleCode.ADMIN])
  @Query(() => [Role])
  async roles() {
    return await Role.find();
  }
}
