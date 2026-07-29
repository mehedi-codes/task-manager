import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { statusEnum, tasks } from "./task.schema.js";

const taskSchemaValidator = {
  description: () =>
    z
      .string()
      .min(1, "Task description is required")
      .max(255, "Task description cannot exceed 255 characters"),
  status: () => z.enum(statusEnum).default("new"),
  title: () =>
    z.string().min(1, "Task title is required").max(255, "Task title cannot exceed 255 characters"),
};

const taskOmitFields = { createdAt: true, id: true, updatedAt: true, userId: true } as const;

export const insertTaskSchema = createInsertSchema(tasks, {
  description: taskSchemaValidator.description(),
  status: taskSchemaValidator.status(),
  title: taskSchemaValidator.title(),
}).omit(taskOmitFields);

export const selectTaskSchema = createSelectSchema(tasks);
export const updateTaskSchema = createUpdateSchema(tasks).omit(taskOmitFields);

export type SelectTask = z.infer<typeof selectTaskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
