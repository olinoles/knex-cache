import knex from "knex";

const cache: any = {};

export function attachCache() {
  async function doCache(this: any) {
    try {
      const cacheKey: string = this.toString();
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

  knex.QueryBuilder.extend("cache", doCache);
}
