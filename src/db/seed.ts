import { hash } from "@node-rs/argon2";
import { db } from "@/config/db.js";
import { users, accounts, sessions } from "@/modules/auth/auth.schema.js";
import { tasks } from "@/modules/task/task.schema.js";

const argonOptions = {
  algorithm: 2 as const,
  memoryCost: 524288,
  outputLen: 32,
  parallelism: 4,
  timeCost: 3,
};

const TEST_USERS = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Charlie Brown", email: "charlie@example.com" },
] as const;

const TASK_TEMPLATES = [
  { title: "Set up CI/CD pipeline", status: "in_progress" as const },
  { title: "Write API documentation", status: "new" as const },
  { title: "Refactor authentication module", status: "in_progress" as const },
  { title: "Fix login page responsiveness", status: "completed" as const },
  { title: "Add rate limiting middleware", status: "new" as const },
  { title: "Implement search functionality", status: "cancelled" as const },
  { title: "Database migration script", status: "completed" as const },
  { title: "Unit tests for task service", status: "in_progress" as const },
  { title: "Performance audit", status: "new" as const },
  { title: "Update dependencies", status: "new" as const },
  { title: "Add WebSocket support", status: "cancelled" as const },
  { title: "Optimize database queries", status: "new" as const },
  { title: "Set up monitoring dashboard", status: "in_progress" as const },
  { title: "Implement export feature", status: "new" as const },
  { title: "Security audit preparation", status: "new" as const },
];

async function main() {
  const startTime = Date.now();

  await db.delete(tasks);
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(users);

  const passwordHash = await hash("password123", argonOptions);

  let taskIndex = 0;
  for (const u of TEST_USERS) {
    const userId = crypto.randomUUID();

    await db.insert(users).values({
      id: userId,
      email: u.email,
      emailVerified: true,
      name: u.name,
    });

    await db.insert(accounts).values({
      id: crypto.randomUUID(),
      accountId: u.email,
      password: passwordHash,
      providerId: "credential",
      userId,
    });

    const userTaskCount = 5;
    const tasksToInsert = TASK_TEMPLATES.slice(taskIndex, taskIndex + userTaskCount).map(
      (template) => ({
        description: `${template.title} — detailed description for ${u.name}`,
        status: template.status,
        title: template.title,
        userId,
      }),
    );
    taskIndex += userTaskCount;

    if (tasksToInsert.length > 0) {
      await db.insert(tasks).values(tasksToInsert);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Seed completed in ${elapsed}s`);
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
