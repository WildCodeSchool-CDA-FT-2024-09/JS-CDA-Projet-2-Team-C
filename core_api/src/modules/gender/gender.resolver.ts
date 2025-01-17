import { Gender, RoleCode } from '../entities.index';
import { Resolver, Query, Authorized } from 'type-graphql';

@Resolver(Gender)
export default class GenderResolver {
  @Authorized([RoleCode.ADMIN])
  @Query(() => [Gender])
  async genders() {
    return await Gender.find({
      relations: ['users']
    });
  }
}
