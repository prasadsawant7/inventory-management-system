import { env } from "@/env/server";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@/lib/db/schema";

const pool = new pg.Pool({
  connectionString: env.NEON_DATABASE_URL,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

export default db;
