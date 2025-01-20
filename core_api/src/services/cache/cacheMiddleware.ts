import { MiddlewareFn } from 'type-graphql';
import cacheClient from './cacheService';

interface CacheOptions<TArgs extends Record<string, unknown>> {
  key: string | ((args: TArgs) => string);
  ttl: number;
  refreshOnHit?: boolean;
}

/**
 * Middleware function to handle caching for GraphQL resolvers.
 * To be used with the `UseMiddleware` decorator from `type-graphql`.
 *
 * @template TArgs - The type of the arguments passed to the resolver.
 * @param {CacheOptions<TArgs>} options - Configuration options for caching.
 * @param {string | ((args: TArgs) => string)} options.key - The cache key (string) or a function to generate the cache key (string) based on the resolver arguments.
 * @param {number} options.ttl - Time-to-live for the cache entry in seconds.
 * @param {boolean} [options.refreshOnHit] - Optional flag to refresh the cache expiry time on a cache hit. Default is `false`.
 * @returns {MiddlewareFn} - The middleware function to be used in the resolver.
 *
 * @example
 * ```typescript
 * WithCache<{id: string}>({
 *   key: (args) => `user:${args.id}`,
 *   ttl: 60,
 *   refreshOnHit: true,
 * });
 * ```
 */
export function WithCache<TArgs extends Record<string, unknown>>(
  options: CacheOptions<TArgs>
): MiddlewareFn {
  return async ({ args }, next) => {
    const typedArgs = args as TArgs;
    const key =
      typeof options.key === 'function' ? options.key(typedArgs) : options.key;

    try {
      const cacheHit = await cacheClient.get(key);
      if (cacheHit) {
        if (options.refreshOnHit) {
          // console.info('Cache hit, refreshing expiry');
          await cacheClient.expire(key, options.ttl);
        }
        // console.info('Cache hit, returning cached value');
        return JSON.parse(cacheHit);
      }
    } catch (error) {
      console.error('Cache error:', error);
    }

    const result = await next();

    try {
      // console.info('Cache miss, setting cache');
      await cacheClient.set(key, JSON.stringify(result), { EX: options.ttl });
    } catch (error) {
      console.error('Failed to set cache:', error);
    }

    return result;
  };
}
