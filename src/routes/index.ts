import type { Hono } from "hono";
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
    });
};
