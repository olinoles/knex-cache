# Knex-cache

A plugin for Knex.js SQL Query builder to help with any caching you may need on your DB.

## How to set up

To use this lib, first you will have to install it:

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

### Example

```javascript
const client = knex(config);

const result = await client("users").cache();
// will return result as normal, retrieve from cache if available, or store new result in cache

const result = await client("users")
  .select("name", "email")
  .where("user_id", "123")
  .cache();
// can be chained on to any knex query

const result = await client("users").cache({ key: "fetchUsers" });
// use a custom cache key

client.invalidate({ key: "fetchUsers" });
// invalidate a cache using its key

client("users").invalidate();
// invalidate query automatically

const result = await client("users");
// will not be cached or affected by cache
// caching is explicit opt-in.
```

This package was inspired by [this comment](https://github.com/knex/knex/issues/2787#issuecomment-530780656) by [AxxxxOn](https://github.com/Axxxx0n).
