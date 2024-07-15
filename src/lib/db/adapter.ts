import db from "@/lib/db";
import { sessions, users } from "@/lib/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export default adapter;
