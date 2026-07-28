import type { ServerType } from "@hono/node-server";
import { serve } from "@hono/node-server";
import { auth } from "@/config/auth.js";
import { registerRoutes } from "@/routes/index.js";
import { createApp } from "@/utils/create-app.js";

const app = createApp();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

registerRoutes(app);

export type App = typeof app;

const server: ServerType = serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
