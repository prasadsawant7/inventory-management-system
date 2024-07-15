import { UserType } from "@/types/form.types";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid("Invalid UUID format").optional(),
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password cannot exceed 255 characters"),
  role: z.enum([UserType.CUSTOMER, UserType.ADMIN], {
    errorMap: () => ({ message: "Role must be either 'Admin' or 'Customer'" }),
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isDeleted: z.boolean().default(false),
});

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
