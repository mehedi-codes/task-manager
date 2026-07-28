import { pinoLogger as honoPinoLogger } from "hono-pino";
import { pino } from "pino";
import pretty from "pino-pretty";
import { env } from "@/config/env.js";

export const pinoLogger = () => {
  const options = env.NODE_ENV === "production" ? undefined : pretty();
  return honoPinoLogger({
    pino: pino({ level: env.LOG_LEVEL }, options),
  });
};
