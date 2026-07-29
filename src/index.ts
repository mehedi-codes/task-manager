import type { ServerType } from "@hono/node-server";
import { serve } from "@hono/node-server";
import { registerRoutes } from "@/routes/index.js";
import { createApp } from "@/utils/create-app.js";
import { env } from "./config/env.js";

const app = createApp();
registerRoutes(app);
export type App = typeof app;

const server: ServerType = serve(app, (info) => {
  console.log(`\n  🚀  Server     : http://localhost:${info.port}`);
  console.log(`  🌍  NODE_ENV   : ${env.NODE_ENV}`);
  console.log(`  📄  Environment: .env.${env.NODE_ENV}\n`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
