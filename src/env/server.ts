import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEON_DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
