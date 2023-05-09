import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "pg";
import lucia from "lucia-auth";
import { pg } from "@lucia-auth/adapter-postgresql";
import { randomHexString } from "../utils/helpers/string";

const pool = new postgres.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const auth = lucia({
  adapter: pg(pool),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  generateCustomUserId: () => {
    // NOTE: Can also add prefix if necessary if necessary. Eg: `user_xxx`
    // Or, you can use any type of random string (eg. UUID)
    return randomHexString();
  },
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      phone: userData.phone,
    };
  },
});

export type Auth = typeof auth;
