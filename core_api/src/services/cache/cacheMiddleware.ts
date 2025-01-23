import { MiddlewareFn } from 'type-graphql';
import cacheClient from './cacheService';

interface CacheOptions<TArgs extends Record<string, unknown>> {
  key: string | ((args: TArgs) => string);
  ttl: number;
}

/**
 * Middleware function to handle caching for GraphQL resolvers.
 * To be used with the `UseMiddleware` decorator from `type-graphql`.
 *
 * @template TArgs - The type of the arguments passed to the resolver.
 * @param {CacheOptions<TArgs>} options - Configuration options for caching.
 * @param {string | ((args: TArgs) => string)} options.key - The cache key (string) or a function to generate the cache key (string) based on the resolver arguments.
 * @param {number} options.ttl - Time-to-live for the cache entry in seconds.
 * @returns {MiddlewareFn} - The middleware function to be used in the resolver.
 *
 * @example
 * ```typescript
 * WithCache<{id: string}>({
 *   key: (args) => `user:${args.id}`,
 *   ttl: 60,
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

    let result;

    try {
      const cacheHit = await cacheClient.get(key);
      if (cacheHit) {
        result = JSON.parse(cacheHit);
        return result;
      }
    } catch (error) {
      console.error('Cache error:', error);
    }

    result = await next();

    try {
      await cacheClient.set(key, JSON.stringify(result), { EX: options.ttl });
    } catch (error) {
      console.error('Failed to set cache:', error);
    }

    return result;
  };
}
