import { z } from "zod";
import { envEnum, envInteger, validateEnv } from "@/utils/validation.js";

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string().default(""),
  BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.url({ error: "DATABASE_URL must be a valid URL" }).refine(
    (val) => {
      const url = new URL(val);
      return url.protocol === "postgresql:" || url.protocol === "postgres:";
    },
    { message: "DATABASE_URL must use postgresql:// or postgres:// protocol" },
  ),
  GOOGLE_APP_PASS: z.string().default(""),
  GOOGLE_APP_USER: z.string().default(""),
  LOG_LEVEL: envEnum(["fatal", "error", "warn", "info", "debug", "trace"], "info"),
  NODE_ENV: envEnum(["development", "production", "test"], "development"),
  PORT: envInteger("PORT", 3000),
});

export const env = validateEnv(envSchema);
