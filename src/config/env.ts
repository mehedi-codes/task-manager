import { z } from "zod";
import { envEnum, envInteger, validateEnv } from "@/utils/validation.js";

const envSchema = z.object({
  DATABASE_URL: z
    .url({ error: "DATABASE_URL must be a valid URL" })
    .refine(
      (val) => {
        const url = new URL(val);
        return url.protocol === "postgresql:" || url.protocol === "postgres:";
      },
      { message: "DATABASE_URL must use postgresql:// or postgres:// protocol" },
    ),
  NODE_ENV: envEnum(["development", "production", "test"], "development"),
  LOG_LEVEL: envEnum(["fatal", "error", "warn", "info", "debug", "trace"], "info"),
  PORT: envInteger("PORT", 3000),
});

export const env = validateEnv(envSchema);
