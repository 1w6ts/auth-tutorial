import { drizzle } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import { config } from "../config/config";

const instance = neon(config.database.url!);

export const db = drizzle(instance as any); // ignore this type plzzz
