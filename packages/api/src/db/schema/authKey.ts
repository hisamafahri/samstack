import { pgTable, boolean, varchar, bigint } from "drizzle-orm/pg-core";
import { authUser } from "./authUser";

export const authKey = pgTable("auth_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 32,
  })
    .notNull()
    .references(() => authUser.id),
  primaryKey: boolean("primary_key").notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
  expires: bigint("expires", {
    mode: "number",
  }),
});
