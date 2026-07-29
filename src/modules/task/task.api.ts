import { z } from "zod";
import { verifyAuth } from "@/middlewares/verify-auth.js";
import { createHono } from "@/utils/create-hono.js";
import { httpStatus, sendResponse } from "@/utils/response.js";
import { verifyRequest } from "@/utils/verify-request.js";
import { taskServices } from "./task.service.js";
import { insertTaskSchema, updateTaskSchema } from "./task.validator.js";

export const taskRoutes = createHono()
  .use("*", verifyAuth())
  .get("/", async (c) => {
    const user = c.var.user;
    const tasks = await taskServices(c.var.db, user.id).getTasksByUserId();
    return sendResponse(c, { data: tasks, message: "Tasks retrieved successfully" });
  })
  .post("/", verifyRequest("json", insertTaskSchema), async (c) => {
    const data = c.req.valid("json");
    const task = await taskServices(c.var.db, c.var.user.id).createTask(data);
    return sendResponse(c, {
      data: task,
      message: "Task created successfully",
      statusCode: httpStatus.CREATED,
    });
  })
  .patch(
    "/:id",
    verifyRequest("param", z.object({ id: z.uuid("Task ID is required") })),
    verifyRequest("json", updateTaskSchema),
    async (c) => {
      const taskId = c.req.valid("param").id;
      if (!taskId) {
        return sendResponse(c, {
          message: "Task ID is required",
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
        });
      }
      const body = c.req.valid("json");
      const task = await taskServices(c.var.db, c.var.user.id).updateTaskById(taskId, body);
      if (!task)
        return sendResponse(c, {
          message: "Task not found",
          statusCode: httpStatus.NOT_FOUND,
          success: false,
        });
      return sendResponse(c, { data: task, message: "Task updated successfully" });
    },
  )
  .delete(
    "/:id",
    verifyRequest("param", z.object({ id: z.uuid("Task ID is required") })),
    async (c) => {
      const taskId = c.req.valid("param").id;
      if (!taskId)
        return sendResponse(c, {
          message: "Task ID is required",
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
        });
      const task = await taskServices(c.var.db, c.var.user.id).deleteTaskById(taskId);
      if (!task)
        return sendResponse(c, {
          message: "Task not found",
          statusCode: httpStatus.NOT_FOUND,
          success: false,
        });
      return sendResponse(c, { data: task, message: "Task deleted successfully" });
    },
  );
