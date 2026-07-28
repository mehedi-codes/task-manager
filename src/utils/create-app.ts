import { createFactory } from "hono/factory";
import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";
import type { AppBindings } from "@/types/index.js";
import { db } from "@/db/index.js";
import { favicon } from "@/middlewares/favicon.js";
import { notFound } from "@/middlewares/not-found.js";
import { onError } from "@/middlewares/on-error.js";
import { pinoLogger } from "@/middlewares/pino-logger.js";

export const factory = createFactory<AppBindings>();

const setDb = factory.createMiddleware(async (c, next) => {
	c.set("db", db);
	await next();
});

export const createApp = () => {
	const app = new OpenAPIHono<AppBindings>({ strict: false });
	app.use("*", cors());
	app.use("*", secureHeaders());
	app.use("*", requestId());
	app.use("*", favicon("📓"));
	app.use("*", pinoLogger());
	app.use("*", setDb);
	app.use("*", compress());
	app.notFound(notFound);
	app.onError(onError);
	return app;
};