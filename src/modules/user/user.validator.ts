import { usersTable } from '@/db/schema/user.js';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const insertUserSchema = createInsertSchema(usersTable, {
  email: z.email({ error: "Invalid email format" }),
}).omit({
  name: true,
  security: true
}).extend({
  password: z.string().min(8, { error: "Password must be minimum 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
    .regex(/\p{Extended_Pictographic}/u, { message: "Password must contain at least one emoji" }),
  firstName: z.string().min(1, { error: "First name is required" }).max(50, { error: "First name cannot exceed 50 characters" }),
  lastName: z.string().min(1, { error: "Last name is required" }).max(50, { error: "Last name cannot exceed 50 characters" }),
});


const selectUserSchema = createSelectSchema(usersTable);

export const UserValidators = {
  insertUserSchema,
  selectUserSchema,
};