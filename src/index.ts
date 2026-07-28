import { serve, type ServerType } from '@hono/node-server'
import { createApp } from '@/utils/create-app.js';
import { OpenAPIConfig } from '@/utils/openapi-config.js';
import { registerRoutes } from '@/routes/index.js';

const app = createApp();

OpenAPIConfig(app)
export const routedApp = registerRoutes(app);

export type AppType = typeof routedApp;

const server: ServerType = serve(routedApp, (info) => {
  console.log(`Listening on http://localhost:${info.port}`)
})

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
