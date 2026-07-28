import type { z } from "zod";
import { UserValidators } from "./user.validator.js";

export type User = z.infer<typeof UserValidators.selectUserSchema>;
export type NewUser = z.infer<typeof UserValidators.insertUserSchema>;
