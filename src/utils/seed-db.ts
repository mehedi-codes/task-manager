import { hash } from "@node-rs/argon2";
import { db } from "@/config/db.js";
import { accounts, sessions, users } from "@/modules/auth/auth.schema.js";
import { tasks } from "@/modules/task/task.schema.js";

const argonOptions = {
  algorithm: 2 as const,
  memoryCost: 524288,
  outputLen: 32,
  parallelism: 4,
  timeCost: 3,
};

const SEED_USERS = [
  {
    email: "alice@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    phoneNumber: "+1-555-0101",
    profilePicture: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alice",
  },
  {
    email: "bob@example.com",
    firstName: "Bob",
    lastName: "Smith",
    phoneNumber: "+1-555-0102",
    profilePicture: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bob",
  },
  {
    email: "charlie@example.com",
    firstName: "Charlie",
    lastName: "Brown",
    phoneNumber: "+1-555-0103",
    profilePicture: null,
  },
] as const;

const TASK_TEMPLATES = [
  { status: "in_progress" as const, title: "Set up CI/CD pipeline" },
  { status: "new" as const, title: "Write API documentation" },
  { status: "in_progress" as const, title: "Refactor authentication module" },
  { status: "completed" as const, title: "Fix login page responsiveness" },
  { status: "new" as const, title: "Add rate limiting middleware" },
  { status: "cancelled" as const, title: "Implement search functionality" },
  { status: "completed" as const, title: "Database migration script" },
  { status: "in_progress" as const, title: "Unit tests for task service" },
  { status: "new" as const, title: "Performance audit" },
  { status: "new" as const, title: "Update dependencies" },
  { status: "cancelled" as const, title: "Add WebSocket support" },
  { status: "new" as const, title: "Optimize database queries" },
  { status: "in_progress" as const, title: "Set up monitoring dashboard" },
  { status: "new" as const, title: "Implement export feature" },
  { status: "new" as const, title: "Security audit preparation" },
];

(async () => {
  const startTime = Date.now();

  await db.delete(tasks);
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(users);

  const passwordHash = await hash("password123", argonOptions);

  let taskIndex = 0;
  for (const u of SEED_USERS) {
    const userId = crypto.randomUUID();

    await db.insert(users).values({
      email: u.email,
      emailVerified: true,
      firstName: u.firstName,
      id: userId,
      image: u.profilePicture,
      lastName: u.lastName,
      name: `${u.firstName} ${u.lastName}`,
      phoneNumber: u.phoneNumber,
    });

    await db.insert(accounts).values({
      accountId: u.email,
      id: crypto.randomUUID(),
      password: passwordHash,
      providerId: "credential",
      userId,
    });

    const userTaskCount = 5;
    const tasksToInsert = TASK_TEMPLATES.slice(taskIndex, taskIndex + userTaskCount).map(
      (template) => ({
        description: `${template.title} — detailed description for ${u.firstName}`,
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
})().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
