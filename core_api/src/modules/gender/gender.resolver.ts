import { Gender } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(Gender)
export default class GenderResolver {
  @Query(() => [Gender])
  async genders() {
    return await Gender.find({
      relations: ['users']
    });
  }
}
