//========================
// better-auth sessions
//========================
import type { BetterAuthOptions } from "better-auth/minimal";

export const betterAuthSession: NonNullable<BetterAuthOptions["session"]> = {
  expiresIn: 60 * 60 * 24 * 7,
  freshAge: 60 * 60,
  updateAge: 60 * 60 * 24,
  cookieCache: {
    enabled: true,
    maxAge: 60 * 60 * 1,
    strategy: "jwt",
  },
};
