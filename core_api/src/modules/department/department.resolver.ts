import { Department } from '../entities.index';
import { Resolver, Query } from 'type-graphql';

@Resolver(Department)
export default class DepartmentResolver {
  @Query(() => [Department])
  async departments() {
    return await Department.find({
      relations: ['users']
    });
  }
}
