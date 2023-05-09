# @samstack/api

This packages is the heart of samstack backend services. It's powered by [tRPC](https://trpc.io), [DrizzleORM](https://github.com/drizzle-team/drizzle-orm) + PostgreSQL, [zod](https://zod.dev), and [Lucia](https://lucia-auth.com/.

## Database

Declare your database tables in the folder `packages/api/src/db/schema/*`. You can follow the official [DrizzleORM documentation](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pg-core/README.md) for more details.

### Generating SQL Migration File

Once you've updated your database schemas, just run:

```
yarn db:generate
```

to generate your updated schemas inside `packages/api/src/db/migrations/*` directory.

## Endpoints (Router)

Declare your endpoints/router in the `packages/api/src/router/*` directory. I'd like to make each router in a dedicated folder so then I can split it easily later on if needed. But, you can follow the official [tRPC documentation](https://trpc.io/docs) to adjust as you like.

Don't forget to declare your newly created router in the `packages/api/src/router/index.ts` file.
