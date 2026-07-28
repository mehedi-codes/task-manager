import type { NotFoundHandler } from "hono";
import { httpStatus, httpStatusMessage, sendResponse } from "@/utils/response.js";

export const notFound: NotFoundHandler = (context) => {
	return sendResponse(context, {
		statusCode: httpStatus.NOT_FOUND,
		success: false,
		message: `${httpStatusMessage.NOT_FOUND} - ${context.req.path}`,
	});
};
