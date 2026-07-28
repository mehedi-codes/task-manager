import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { authSession } from "@/middlewares/auth-session.js";
import { favicon } from "@/middlewares/favicon.js";
import { notFound } from "@/middlewares/not-found.js";
import { onError } from "@/middlewares/on-error.js";
import { pinoLogger } from "@/middlewares/pino-logger.js";
import { setDb } from "@/middlewares/set-db.js";
import type { AppBindings } from "@/types/index.js";

export const createApp = () => {
  const app = new Hono<AppBindings>({ strict: false });
  app.use("*", cors());
  app.use("*", secureHeaders());
  app.use("*", requestId());
  app.use("*", favicon("📓"));
  app.use("*", pinoLogger());
  app.use("*", setDb());
  app.use("*", authSession());
  app.use("*", compress());
  app.notFound(notFound);
  app.onError(onError);
  return app;
};
