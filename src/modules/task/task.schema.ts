import { index, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "@/modules/auth/auth.schema.js";

export const statusEnum = ["new", "in_progress", "completed", "cancelled"] as const;
export const taskStatus = pgEnum("status", statusEnum);

export const tasks = pgTable(
  "tasks",
  {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    status: taskStatus("status").default("new").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [index("tasks_user_id_index").on(t.userId)],
);
