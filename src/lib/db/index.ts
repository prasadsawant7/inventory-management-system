import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env/server";

const pool = new pg.Pool({
  connectionString: env.NEON_DATABASE_URL,
});

const db = drizzle(pool);

export default db;
