import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { env } from "@/config/env.js";
import { httpStatus, httpStatusMessage, sendResponse } from "@/utils/response.js";

export const onError: ErrorHandler = (error, context) => {
	const rawStatus =
		"status" in error
			? Number(error.status)
			: context.newResponse(null).status;

	const statusCode: ContentfulStatusCode =
		rawStatus >= 400 && rawStatus < 600
			? (rawStatus as ContentfulStatusCode)
			: httpStatus.INTERNAL_SERVER_ERROR;

	return sendResponse(context, {
		statusCode,
		success: false,
		message: error.message || httpStatusMessage.INTERNAL_SERVER_ERROR,
		stack: env.NODE_ENV === "production" ? undefined : error.stack,
	});
};