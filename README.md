# Knex-cache

A plugin for Knex.js SQL Query builder to help with any caching you may need on your DB.

## How to set up

To use this lib, first you will have to install it:

```
# PNPM
pnpm i knex-cache --save
# NPM
npm i knex-cache --save
# Yarn
yarn add knex-cache
```

Then, add the following lines to your Knex set up:

```javascript
import { attachCache } from "knex-cache";

attachCache();
```

## How to use

### Example

```javascript
const result = await knex("users").cache();
// will return result as normal, retrieve from cache if available, or store new result in cache

const result = await knex("users")
  .select("name", "email")
  .where("user_id", "123")
  .cache();
// can be chained on to any knex query

const result = await knex("users");
// will not use cache
```

This package was inspired by [this comment](https://github.com/knex/knex/issues/2787#issuecomment-530780656) by [AxxxxOn](https://github.com/Axxxx0n).
