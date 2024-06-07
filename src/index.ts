import knex, { Knex } from "knex";

const cache: Record<string, unknown> = {};

interface CacheOptions {
  key?: string;
}

export function attachCache() {
  async function setCache(this: Knex.QueryBuilder, { key }: CacheOptions) {
    try {
      const cacheKey: string = key || this.toString();
      if (cache[cacheKey]) {
        return cache[cacheKey];
      }
      const data = await this;
      cache[cacheKey] = data;
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }
  async function invalidateCache(
    this: Knex.QueryBuilder,
    { key }: CacheOptions
  ) {
    try {
      const cacheKey: string = key || this.toString();
      if (cache[cacheKey]) {
        delete cache[cacheKey];
      }
      return this;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  knex.QueryBuilder.extend("cache", setCache);
  knex.QueryBuilder.extend("invalidate", invalidateCache);
}
