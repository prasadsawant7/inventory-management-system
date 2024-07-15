"use server";

import { z } from "zod";
import { SignUpSchema, LoginSchema } from "@/lib/schema";
import { getUserByEmail } from "@/actions/user.actions";
import { saltAndHashPassword } from "@/utils";
import { users } from "@/lib/db/schema";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const validatedFields = SignUpSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid Fields!");
    }

    const { firstName, lastName, email, password, role } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await saltAndHashPassword(password);

    const newUser = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        hashedPassword,
        role,
      })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    const userId = newUser[0].id;

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30, // 30 Days
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: "Account created successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid fields!");
    }

    const existingUser = await db.query.users.findFirst({
      where: (table) => eq(table.email, validatedFields.data.email),
    });

    if (!existingUser) {
      throw new Error("User does not exist!");
    }

    if (!existingUser.hashedPassword) {
      throw new Error("User does not exist!");
    }

    if (existingUser.role !== validatedFields.data.role) {
      throw new Error("Incorrect user type!");
    }

    const isCorrectPassword = await bcrypt.compare(
      validatedFields.data.password,
      existingUser.hashedPassword,
    );

    if (!isCorrectPassword) {
      throw new Error("Incorrect credentials!");
    }

    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30, // 30 Days
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: "Logged in successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const logout = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new Error("Unauthorized!");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: any) {
    return { error: error?.message };
  }
};
