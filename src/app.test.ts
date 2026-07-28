import { describe, expect, it } from "bun:test";

describe("App", () => {
  it("creates without error", async () => {
    const { createApp } = await import("@/utils/create-app.js");
    const app = createApp();
    expect(app).toBeDefined();
  });

  it("health endpoint returns 200", async () => {
    const { createApp } = await import("@/utils/create-app.js");
    const { registerRoutes } = await import("@/routes/index.js");
    const app = createApp();
    const routed = registerRoutes(app);
    const res = await routed.request("/health");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("status", "ok");
  });
});
