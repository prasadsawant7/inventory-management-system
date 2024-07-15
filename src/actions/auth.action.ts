"use server";

import { z } from "zod";
import { SignUpSchema, LoginSchema } from "@/lib/schema";
import { getUserByEmail } from "@/actions/user.action";
import { saltAndHashPassword } from "@/utils";
import { users } from "@/lib/db/schema";
import db from "@/lib/db";

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
    hashedPassword,
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
