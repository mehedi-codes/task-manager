import { pinoLogger as honoPinoLogger } from "hono-pino";
import pino from "pino";
import { env } from "@/config/env.js";

export const pinoLogger = () => {
  const targets: { target: string; options?: Record<string, unknown> }[] = [];

  if (env.NODE_ENV !== "production") {
    targets.push({ target: "pino-pretty" });
  }

  if (env.BETTER_STACK_SOURCE_TOKEN && env.BETTER_STACK_INGESTING_HOST) {
    targets.push({
      target: "@logtail/pino",
      options: {
        options: { endpoint: `https://${env.BETTER_STACK_INGESTING_HOST}` },
        sourceToken: env.BETTER_STACK_SOURCE_TOKEN,
      },
    });
  }

  const stream = targets.length > 0 ? pino.transport({ targets }) : undefined;

  return honoPinoLogger({
    pino: pino({ level: env.LOG_LEVEL }, stream),
  });
};
