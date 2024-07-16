import {
  SignUpSchema,
  LoginSchema,
  ProductInsertSchema,
  ProductSelectSchema,
} from "@/lib/schema";
import { z } from "zod";

export type SignUpFormType = z.infer<typeof SignUpSchema>;
export type LoginFormType = z.infer<typeof LoginSchema>;
export type AddProductFormType = z.infer<typeof ProductInsertSchema>;
export type ReadProductsType = z.infer<typeof ProductSelectSchema>;

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
