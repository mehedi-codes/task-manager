import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.js";

const drizzleConfig = defineConfig({
  dbCredentials: { url: env.DATABASE_URL },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/modules/**/*.schema.ts",
});

export default drizzleConfig;
