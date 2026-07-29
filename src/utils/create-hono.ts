import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/types/index.js";

export const createHono = () => new OpenAPIHono<AppBindings>({ strict: false });
