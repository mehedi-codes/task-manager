import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger as HonoPinoLogger } from "hono-pino";
import type { DB } from "@/db/index.js";

export type AppVariables = {
	logger: HonoPinoLogger;
	db: DB;
};

export type AppBindings = {
	Variables: AppVariables;
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;
