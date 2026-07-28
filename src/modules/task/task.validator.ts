import { tasksTable } from '@/db/schema/task.js';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";

const insertTaskSchema = createInsertSchema(tasksTable, {
  title: z.string().min(1, { error: "Task title is required" }).max(255, { error: "Task title cannot exceed 255 characters" }),
  description: z.string().min(1, { error: "Task description is required" }).max(255, { error: "Task description cannot exceed 255 characters" }),
});

const selectTaskSchema = createSelectSchema(tasksTable);

export const TaskValidators = {
  insertTaskSchema,
  selectTaskSchema,
};
