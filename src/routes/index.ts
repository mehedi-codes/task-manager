import type { AppOpenAPI } from "@/types/index.js";
import { createRoute, z } from "@hono/zod-openapi";

export const registerRoutes = (app: AppOpenAPI) => {
	return app
		.openapi(
			createRoute({
				method: "get",
				path: "/",
				responses: {
					200: {
						content: {
							"application/json": {
								schema: z.object({
									message: z.string(),
								}),
							},
						},
						description: "Task Manager API",
					},
				},
			}),
			(c) => {
				return c.json({
					message: "Task Manager REST API",
				});
			},
		)
		.openapi(
			createRoute({
				method: "get",
				path: "/health",
				responses: {
					200: {
						content: {
							"application/json": {
								schema: z.object({
									status: z.string(),
								}),
							},
						},
						description: "Health check",
					},
				},
			}),
			(c) => {
				return c.json({ status: "ok" });
			},
		)
		.get("/error", () => {
			throw new Error("This is a test error");
		});
};
