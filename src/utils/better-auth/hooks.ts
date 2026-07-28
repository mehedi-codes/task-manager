import { createAuthMiddleware } from "better-auth/api";
import type { BetterAuthOptions } from "better-auth/minimal";
import { sendWelcomeEmail } from "@/utils/better-auth/email.js";

export const betterAuthHooks: NonNullable<BetterAuthOptions["hooks"]> = {
  after: createAuthMiddleware(async (payload) => {
    if (payload.path.startsWith("/sign-up")) {
      const user = payload.context.newSession?.user ?? {
        email: payload.body.email,
        name: payload.body.name,
      };
      if (user) {
        await sendWelcomeEmail(user.name, user.email);
      }
    }
  }),
};
