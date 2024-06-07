import { Knex } from "knex";

declare module "knex" {
  namespace Knex {
    interface QueryInterface {
      cache<TRecord extends {} = any, TResult = any>(): Knex.QueryBuilder<
        TRecord,
        TResult
      >;
    }
  }
}
