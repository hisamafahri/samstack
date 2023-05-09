import { pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const authUser = pgTable(
  "auth_user",
  {
    id: varchar("id", {
      length: 32,
    }).primaryKey(),
    phone: varchar("phone", {
      length: 14,
    }).notNull(),
    // NOTE: Add other user attributes
  },
  (authUser) => {
    return {
      phoneIndex: uniqueIndex("phone_index").on(authUser.phone),
    };
  }
);
