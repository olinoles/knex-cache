import { Knex } from "knex";

interface CacheOptions {
  key?: string;
}
declare module "knex" {
  namespace Knex {
    interface QueryInterface {
      cache<TRecord extends {} = any, TResult = any>(
        options?: CacheOptions
      ): Knex.QueryBuilder<TRecord, TResult>;
      invalidate<TRecord extends {} = any, TResult = any>(
        options?: CacheOptions
      ): Knex.QueryBuilder<TRecord, TResult>;
    }
  }
}
