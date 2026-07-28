import { auth } from "@/config/auth.js";
import { factory } from "@/utils/factory.js";

export const authSession = () => {
  return factory.createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  });
};
