import { SignUpSchema, LoginSchema } from "@/lib/schema";
import { z } from "zod";

export type SignUpFormType = z.infer<typeof SignUpSchema>;

export type LoginFormType = z.infer<typeof LoginSchema>;

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
