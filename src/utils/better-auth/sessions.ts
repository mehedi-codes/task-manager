//========================
// better-auth sessions
//========================
import type { BetterAuthOptions } from "better-auth/minimal";

export const betterAuthSession: NonNullable<BetterAuthOptions["session"]> = {
  expiresIn: 60 * 60 * 24 * 7, // Seconds * Minutes * Hours * Days
  // updateAge: 60 * 60 * 24 * 1, // Seconds * Minutes * Hours * Days
  cookieCache: {
    enabled: true,
    maxAge: 60 * 60 * 1, // Seconds * Minutes * Hours * Days
    strategy: "jwt",
  },
};
