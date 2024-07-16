import { z } from "zod";
import { UserType } from "@/types/form.types";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "@/lib/db/schema";

export const SignUpSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot exceed 50 characters"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name cannot exceed 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password cannot exceed 255 characters"),
  role: z.enum([UserType.CUSTOMER, UserType.ADMIN], {
    errorMap: () => ({ message: "Role must be either 'Admin' or 'Customer'" }),
  }),
});

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password cannot exceed 255 characters"),
  role: z.enum([UserType.CUSTOMER, UserType.ADMIN], {
    errorMap: () => ({ message: "Role must be either 'Admin' or 'Customer'" }),
  }),
});

export const ProductInsertSchema = createInsertSchema(products, {
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters long"),
  hsnSacCode: z
    .string({ required_error: "HSN/SAC Code is required" })
    .min(2, "HSN/SAC Code must be at least 2 characters long"),
  stock: z.coerce
    .number({ required_error: "Stock is required" })
    .min(1, "At least 1 stock should be added")
    .nonnegative(),
  unit: z
    .string({ required_error: "Unit is required" })
    .min(1, "Unit is required"),
  rate: z.coerce
    .number({ required_error: "Rate is required" })
    .min(1, "At least rate should be ₹1")
    .nonnegative(),
  taxableAmount: z.coerce.number().nonnegative(),
  gst: z.coerce.number({ required_error: "GST is required" }),
  cGst: z.coerce.number().nonnegative(),
  sGst: z.coerce.number().nonnegative(),
  iGst: z.coerce.number({ required_error: "IGST is required" }),
  totalGst: z.coerce.number().nonnegative(),
  amount: z.coerce.number().nonnegative(),
});
export const ProductSelectSchema = createSelectSchema(products, {
  rate: z.coerce
    .number({ required_error: "Rate is required" })
    .min(1, "At least rate should be ₹1")
    .nonnegative(),
  taxableAmount: z.coerce.number().nonnegative(),
  gst: z.coerce.number({ required_error: "GST is required" }),
  cGst: z.coerce.number().nonnegative(),
  sGst: z.coerce.number().nonnegative(),
  iGst: z.coerce.number({ required_error: "IGST is required" }),
  totalGst: z.coerce.number().nonnegative(),
  amount: z.coerce.number().nonnegative(),
});
