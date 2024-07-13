import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
