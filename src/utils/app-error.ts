import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
	constructor(
		public readonly statusCode: ContentfulStatusCode,
		message: string = "An unexpected error occurred",
		public readonly isOperational = true,
		stack?: string,
	) {
		super(message);
		this.name = this.constructor.name;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export class ValidationError extends AppError {
	constructor(message: string = "Validation failed") {
		super(400, message);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = "Resource not found") {
		super(404, message);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = "Unauthorized") {
		super(401, message);
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string = "Forbidden") {
		super(403, message);
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(409, message);
	}
}
