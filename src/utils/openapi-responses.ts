import { z } from "@hono/zod-openapi";

export const apiResponse = <T extends z.ZodType>(data: T) =>
  z.object({
    data: data.nullable(),
    message: z.string(),
    success: z.boolean().openapi({ example: true }),
  });
