import { Department, RoleCode } from '../entities.index';
import { Resolver, Query, Authorized } from 'type-graphql';
import cacheClient from '../../services/cache/cacheService';

@Resolver(Department)
export default class DepartmentResolver {
  @Authorized([RoleCode.ADMIN, RoleCode.AGENT])
  @Query(() => [Department])
  async departments() {
    return await Department.find({
      relations: ['users']
    });
  }

  @Authorized([RoleCode.SECRETARY])
  @Query(() => [Department], {
    description: 'Fetches all departments and their doctors'
  })
  async allDepartmentsWithDoctors(): Promise<Department[]> {
    // Demo of basic Redis caching
    const cacheKey = `allDepartmentsWithDoctors`;
    // Check Redis cache first
    const cacheHit = await cacheClient.get(cacheKey);
    if (cacheHit) {
      return JSON.parse(cacheHit);
    }

    const result = await Department.find({
      relations: ['users', 'users.role'],
      where: { users: { role: { code: RoleCode.DOCTOR } } }
    });

    // Cache the result
    await cacheClient.set(cacheKey, JSON.stringify(result), {
      // Expiry in seconds for the cache entry
      EX: 30
    });

    return result;
  }
}
