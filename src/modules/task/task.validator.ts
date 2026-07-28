import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { tasks } from "./task.schema.js";

export const insertTaskSchema = createInsertSchema(tasks, {
  description: z
    .string()
    .min(1, { error: "Task description is required" })
    .max(255, { error: "Task description cannot exceed 255 characters" }),
  title: z
    .string()
    .min(1, { error: "Task title is required" })
    .max(255, { error: "Task title cannot exceed 255 characters" }),
});

export const selectTaskSchema = createSelectSchema(tasks);

export type Task = z.infer<typeof selectTaskSchema>;
export type NewTask = z.infer<typeof insertTaskSchema>;
