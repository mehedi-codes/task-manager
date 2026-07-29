import { $, createRoute, z } from "@hono/zod-openapi";
import { verifyAuth } from "@/middlewares/verify-auth.js";
import { createHono } from "@/utils/create-hono.js";
import { apiResponse } from "@/utils/openapi-responses.js";
import { taskServices } from "./task.service.js";
import {
  insertTaskSchema,
  selectTaskSchema,
  taskListResponse,
  updateTaskSchema,
} from "./task.validator.js";

const paramSchema = z.object({ id: z.uuid() });

const getTasksRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Tasks"],
  responses: {
    200: {
      content: { "application/json": { schema: apiResponse(taskListResponse) } },
      description: "Tasks retrieved",
    },
  },
});

const createTaskRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Tasks"],
  request: {
    body: { content: { "application/json": { schema: insertTaskSchema } } },
  },
  responses: {
    201: {
      content: { "application/json": { schema: apiResponse(selectTaskSchema) } },
      description: "Task created",
    },
  },
});

const updateTaskRoute = createRoute({
  method: "patch",
  path: "/{id}",
  tags: ["Tasks"],
  request: {
    body: { content: { "application/json": { schema: updateTaskSchema } } },
    params: paramSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: apiResponse(selectTaskSchema) } },
      description: "Task updated",
    },
    404: {
      content: { "application/json": { schema: apiResponse(z.null()) } },
      description: "Task not found",
    },
  },
});

const deleteTaskRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Tasks"],
  request: {
    params: paramSchema,
  },
  responses: {
    200: {
      content: { "application/json": { schema: apiResponse(selectTaskSchema) } },
      description: "Task deleted",
    },
    404: {
      content: { "application/json": { schema: apiResponse(z.null()) } },
      description: "Task not found",
    },
  },
});

export const taskRoutes = $(createHono().use("*", verifyAuth()))
  .openapi(getTasksRoute, async (c) => {
    const user = c.var.user;
    const data = await taskServices(c.var.db, user.id).getTasksByUserId();
    return c.json({ message: "Tasks retrieved successfully", success: true, data }, 200);
  })
  .openapi(createTaskRoute, async (c) => {
    const body = c.req.valid("json");
    const task = await taskServices(c.var.db, c.var.user.id).createTask(body);
    return c.json({ data: task, message: "Task created successfully", success: true }, 201);
  })
  .openapi(updateTaskRoute, async (c) => {
    const taskId = c.req.valid("param").id;
    const body = c.req.valid("json");
    const task = await taskServices(c.var.db, c.var.user.id).updateTaskById(taskId, body);
    if (!task) return c.json({ data: null, message: "Task not found", success: false }, 404);
    return c.json({ data: task, message: "Task updated successfully", success: true }, 200);
  })
  .openapi(deleteTaskRoute, async (c) => {
    const taskId = c.req.valid("param").id;
    const task = await taskServices(c.var.db, c.var.user.id).deleteTaskById(taskId);
    if (!task) return c.json({ data: null, message: "Task not found", success: false }, 404);
    return c.json({ data: task, message: "Task deleted successfully", success: true }, 200);
  });
