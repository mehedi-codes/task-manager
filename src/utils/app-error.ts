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
