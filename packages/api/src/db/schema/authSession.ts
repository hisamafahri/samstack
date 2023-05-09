import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";
import { authUser } from "./authUser";

export const authSession = pgTable("auth_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 32,
  })
    .notNull()
    .references(() => authUser.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});
