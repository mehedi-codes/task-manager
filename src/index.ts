import type { ServerType } from "@hono/node-server";
import { serve } from "@hono/node-server";
import { registerRoutes } from "@/routes/index.js";
import { createApp } from "@/utils/create-app.js";

const app = createApp();

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
