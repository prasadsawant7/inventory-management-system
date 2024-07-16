import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { UserType } from "@/types/form.types";

export const roleEnum = pgEnum("role", [UserType.CUSTOMER, UserType.ADMIN]);

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  role: roleEnum("role").default(UserType.CUSTOMER).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  hsnSacCode: text("hsn_sac_code").notNull(),
  stock: integer("stock").notNull(),
  unit: text("unit").notNull(),
  rate: decimal("rate").$type<number>().notNull(),
  taxableAmount: decimal("taxable_amount").$type<number>().notNull(),
  gst: decimal("gst").$type<number>().notNull(),
  cGst: decimal("cgst").$type<number>().notNull(),
  sGst: decimal("sgst").$type<number>().notNull(),
  iGst: decimal("igst").$type<number>().notNull(),
  totalGst: decimal("total_gst").$type<number>().notNull(),
  amount: decimal("amount").$type<number>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
