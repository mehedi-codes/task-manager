import { eq } from "drizzle-orm";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { tasks } from "./task.schema.js";
import type { InsertTask, SelectTask, UpdateTask } from "./task.validator.js";

export const taskServices = (db: NeonHttpDatabase, userId: string) => ({
  createTask: async (task: InsertTask) => {
    const newTask = { ...task, userId };
    const [createdTask] = await db.insert(tasks).values(newTask).returning();
    return createdTask;
  },
  deleteTaskById: async (id: string) => {
    const [deletedTask] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return deletedTask;
  },
  getTasksByUserId: async () => {
    const result = await db.select().from(tasks).where(eq(tasks.userId, userId));
    // i need to also return a meta information like total number of tasks based on their status
    return result;
  },
  updateTaskById: async (taskId: string, task: UpdateTask) => {
    const [updatedTask] = await db.update(tasks).set(task).where(eq(tasks.id, taskId)).returning();
    return updatedTask;
  },
});
