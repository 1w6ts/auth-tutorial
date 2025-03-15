import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "../config/config";

async function runMigrations() {
  const connection = postgres(config.database.url!, { max: 1 });
  const db = drizzle(connection);

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "src/db/migrations" });

  console.log("Migrations completed!");

  await connection.end();
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
