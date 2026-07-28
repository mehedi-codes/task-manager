import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { db } from "@/config/db.js";
import { env } from "@/config/env.js";
import {
  afterEmailVerification,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "@/utils/better-auth/email.js";
import { betterAuthHooks } from "@/utils/better-auth/hooks.js";
import { passwordOptions } from "@/utils/better-auth/password.js";
import { betterAuthPlugins } from "@/utils/better-auth/plugins.js";
import { betterAuthSession } from "@/utils/better-auth/sessions.js";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  hooks: betterAuthHooks,
  plugins: betterAuthPlugins,
  secret: env.BETTER_AUTH_SECRET,
  session: betterAuthSession,
  emailAndPassword: {
    enabled: true,
    password: passwordOptions,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60 * 1, // Seconds * Minutes * Hours * Days
    sendResetPassword: sendResetPasswordEmail,
  },
  emailVerification: {
    afterEmailVerification: afterEmailVerification,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24, // Seconds * Minutes * Hours * Days
    sendOnSignUp: true,
    sendVerificationEmail: sendVerificationEmail,
  },
});

export type BetterAuth = typeof auth.$Infer.Session;
export type BetterAuthErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
