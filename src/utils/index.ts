import bcrypt from "bcryptjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string): string => {
  if (!text) return text;

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeAll = (text: string): string => {
  if (!text) return text;

  return text.split(" ").map(capitalize).join(" ");
};

export const saltAndHashPassword = async (
  password: string,
): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
