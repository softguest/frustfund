// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql);

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const client = neon(process.env.DATABASE_URL!);

export const db = drizzle(client, {
  schema,        // ✅ REQUIRED for db.query.users, db.query.transactions, etc.
});
