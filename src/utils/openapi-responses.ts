import { z } from "@hono/zod-openapi";

export const apiResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    data: data.nullable().optional(),
    message: z.string(),
    success: z.boolean().openapi({ example: true }),
  });
