"use server";

import { z } from "zod";
import { SignUpSchema, LoginSchema } from "@/schema";
import { getUserByEmail } from "@/lib/user";
import { saltAndHashPassword } from "@/utils";
import { users } from "@/db/schema";
import db from "@/db/drizzle";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { firstName, lastName, email, password, role } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await saltAndHashPassword(password);

  await db.insert(users).values({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  return { success: "User Created!" };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Logged in Successfully!" };
};

export const logout = async () => {
  return { success: "Logged out Successfully!" };
};
