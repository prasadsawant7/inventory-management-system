import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_VERCEL_ENV: z.enum(["production", "preview", "development"]),
  },
  runtimeEnv: {
    // NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
});
