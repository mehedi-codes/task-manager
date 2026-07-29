import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { PinoLogger as HonoPinoLogger } from "hono-pino";
import type { BetterAuth } from "@/config/auth.js";

export type AppBindings = {
  Variables: {
    logger: HonoPinoLogger;
    db: NeonHttpDatabase;
    user: BetterAuth["user"];
    session: BetterAuth["session"];
  };
};
