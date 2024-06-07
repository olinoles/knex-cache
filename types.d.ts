import { Knex } from "knex";

interface CacheOptions {
  key?: string;
}
type CacheMethod = <TRecord extends {} = any, TResult = any>(
  options?: CacheOptions
) => Knex.QueryBuilder<TRecord, TResult>;

type ClearCacheMethod = <
  TRecord extends {} = any,
  TResult = any
>() => Knex.QueryBuilder<TRecord, TResult>;

declare module "knex" {
  namespace Knex {
    interface QueryInterface {
      cache: CacheMethod;
      invalidate: CacheMethod;
      clearCache: ClearCacheMethod;
    }
  }
}

export function attachCache(): void;
