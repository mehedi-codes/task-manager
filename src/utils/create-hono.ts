import { Hono } from "hono";

import type { AppBindings } from "@/types/index.js";

export const createHono = () => new Hono<AppBindings>({ strict: false });
