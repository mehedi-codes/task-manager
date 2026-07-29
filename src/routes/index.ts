import type { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { auth } from "@/config/auth.js";
import { taskRoutes } from "@/modules/task/task.api.js";
import type { AppBindings } from "@/types/index.js";
import { landingPage } from "@/views/landing-page.js";

export const registerRoutes = (app: OpenAPIHono<AppBindings>) => {
  return app
    .get("/", (c) => c.html(landingPage))
    .get("/health", (c) => c.json({ status: "ok" }))
    .get("/error", () => {
      throw new Error("This is a test error");
    })
    .on(["POST", "GET"], "/api/v1/auth/*", (c) => auth.handler(c.req.raw))
    .route("/api/v1/tasks", taskRoutes)
    .get("/api/v1/openapi.json", async (c) => {
      const appSpec = app.getOpenAPIDocument({
        info: { title: "Task Manager API", version: "1.0.0" },
        openapi: "3.1.0",
        tags: [{ description: "Create, read, update, and delete tasks", name: "Tasks" }],
      });
      const authSpec = await auth.api.generateOpenAPISchema();

      const tagOverrides: Record<string, { name: string; description: string }> = {
        Default: {
          description: "Authentication — sign in, sign up, sessions, email verification",
          name: "Auth",
        },
      };
      const mergedTags = [
        ...(appSpec.tags ?? []),
        ...(authSpec.tags ?? []).map(
          (t: { name: string; description?: string }) => tagOverrides[t.name] ?? t,
        ),
      ];

      const authPaths: Record<string, unknown> = {};
      for (const [path, value] of Object.entries(authSpec.paths ?? {})) {
        if (path === "/open-api/generate-schema" || path === "/reference") continue;
        const prefixedPath = `/api/v1/auth${path}`;
        const operations = value as Record<string, unknown>;
        if (operations) {
          for (const [, op] of Object.entries(operations)) {
            const tags = (op as { tags?: string[] })?.tags;
            if (tags) {
              (op as { tags: string[] }).tags = tags.map(
                (tag: string) => tagOverrides[tag]?.name ?? tag,
              );
            }
          }
        }
        authPaths[prefixedPath] = value;
      }
      return c.json({
        ...appSpec,
        paths: { ...appSpec.paths, ...authPaths },
        tags: mergedTags,
        components: {
          ...appSpec.components,
          ...authSpec.components,
          schemas: { ...appSpec.components?.schemas, ...authSpec.components?.schemas },
          securitySchemes: {
            ...appSpec.components?.securitySchemes,
            ...authSpec.components?.securitySchemes,
          },
        },
      });
    })
    .get(
      "/api/v1/docs",
      Scalar({
        pageTitle: "Task Manager API",
        url: "/api/v1/openapi.json",
      }),
    );
};
