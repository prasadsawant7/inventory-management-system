import { loginFormSchema, registerFormSchema } from "@/lib/schema";
import { z } from "zod";

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export type LoginFormType = z.infer<typeof loginFormSchema>;

export enum UserType {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export interface FormErrorProps {
  message?: string;
}

export interface FormSuccessProps {
  message?: string;
}
