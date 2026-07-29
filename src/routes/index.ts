import type { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "@/config/auth.js";
import { taskRoutes } from "@/modules/task/task.api.js";
import type { AppBindings } from "@/types/index.js";
import { landingPage } from "@/views/landing-page.js";

export const registerRoutes = (app: OpenAPIHono<AppBindings>) => {
  return app
    .get("/", (c) => c.html(landingPage))
    .get("/health", (c) => {
      return c.json({ status: "ok" });
    })
    .get("/error", () => {
      throw new Error("This is a test error");
    })
    .on(["POST", "GET"], "/api/v1/auth/*", (c) => auth.handler(c.req.raw))
    .route("/api/v1/tasks", taskRoutes);
};
