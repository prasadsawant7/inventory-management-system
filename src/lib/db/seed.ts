import "dotenv/config";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { seedProducts } from "@/lib/db/seeds/products";

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

const main = async () => {
  try {
    console.log("Seed started...");

    await db.insert(schema.products).values(seedProducts);

    console.log("Seed finished...");
  } catch (error) {
    console.error(error);
    throw new Error("Seed error...");
  }
};

main();
