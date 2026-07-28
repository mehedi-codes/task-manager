import type { AppOpenAPI } from "@/types/index.js";
import packageJSON from "../../package.json" with { type: "json" };

export const OpenAPIConfig = (app: AppOpenAPI) => {
	app.doc("/doc", {
		openapi: "3.2.0",
		info: {
			version: packageJSON.version,
			title: "Task Manager API",
		},
	});
};