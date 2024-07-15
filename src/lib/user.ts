import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .execute();

    return user[0] || null;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();

    return user[0] || null;
  } catch (error) {
    return null;
  }
};
