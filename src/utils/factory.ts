import { createFactory } from "hono/factory";
import type { AppBindings } from "@/types/index.js";
export const factory = createFactory<AppBindings>();
