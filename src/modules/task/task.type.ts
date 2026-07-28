import { TaskValidators } from "./task.validator.js";
import type { z } from "zod";

export type Task = z.infer<typeof TaskValidators.selectTaskSchema>;
export type NewTask = z.infer<typeof TaskValidators.insertTaskSchema>;