# Knex-cache

A plugin for Knex.js SQL Query builder to help with any caching you may need.

## How to install

To use this extension, first you will have to install it:

```
# PNPM
pnpm i knex-cache-plugin --save
# NPM
npm i knex-cache-plugin --save
# Yarn
yarn add knex-cache-plugin
```

Then, add the following lines to your Knex set up:

```javascript
import { attachCache } from "knex-cache-plugin";

attachCache();
```

## How to use

### Caching result of a query

```javascript
const client = knex(config);

const result = await client("users").cache();
// returns query result and caches if not set
// calling this again will return the cached result

const result = await client("users")
  .select("name", "email")
  .where("user_id", "123")
  .cache();
// can be chained on to any knex query

const result = await client("users").cache({ key: "fetchUsers" });
// use a custom cache key
```

### Invalidating cache

```javascript
const client = knex(config);

client("users").invalidate();
// invalidate query automatically

client.invalidate({ key: "fetchUsers" });
// invalidate a cache using a key
```

### Clearing cache

```javascript
const client = knex(config);

client.clearCache();
// clear all records in the cache
```

This package was inspired by [this comment](https://github.com/knex/knex/issues/2787#issuecomment-530780656) by [AxxxxOn](https://github.com/Axxxx0n).
