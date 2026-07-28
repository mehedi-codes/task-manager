import { pgTable, uuid, varchar, timestamp, pgEnum, index } from 'drizzle-orm/pg-core';
import { usersTable } from './user.js';


export const statusEnum = pgEnum("status", ["new", "in_progress", "completed", "cancelled"]);

export const tasksTable = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  status: statusEnum("status").default("new").notNull(),
  userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [index("tasks_user_id_index").on(t.userId)]);
