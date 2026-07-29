import type { Hono } from "hono";
import { auth } from "@/config/auth.js";
import { taskRoutes } from "@/modules/task/task.api.js";
import type { AppBindings } from "@/types/index.js";

export const registerRoutes = (app: Hono<AppBindings>) => {
  return app
    .get("/", (c) => {
      return c.json({ message: "Task Manager REST API" });
    })
    .get("/health", (c) => {
      return c.json({ status: "ok" });
    })
    .get("/error", () => {
      throw new Error("This is a test error");
    })
    .on(["POST", "GET"], "/api/v1/auth/*", (c) => auth.handler(c.req.raw))
    .route("/api/v1/tasks", taskRoutes);
};
