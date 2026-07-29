import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { db } from "@/config/db.js";
import { env } from "@/config/env.js";
import * as schema from "@/modules/auth/auth.schema.js";
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
  basePath: "/api/v1/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  hooks: betterAuthHooks,
  plugins: betterAuthPlugins,
  secret: env.BETTER_AUTH_SECRET,
  session: betterAuthSession,
  trustedOrigins: env.BETTER_AUTH_TRUSTED_ORIGINS ? env.BETTER_AUTH_TRUSTED_ORIGINS.split(",") : [],
  advanced: {
    backgroundTasks: {
      handler: (promise) => {
        setImmediate(() => promise.catch(console.error));
      },
    },
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip"],
    },
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          console.log(
            `[audit] account.linked — userId: ${account.userId}, provider: ${account.providerId}`,
          );
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          console.log(`[audit] session.created — userId: ${session.userId}`);
        },
      },
      delete: {
        before: async (session) => {
          console.log(`[audit] session.deleted — sessionId: ${session.id}`);
        },
      },
    },
    user: {
      update: {
        after: async (user) => {
          console.log(`[audit] user.updated — userId: ${user.id}, email: ${user.email}`);
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: passwordOptions,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60 * 1,
    sendResetPassword: sendResetPasswordEmail,
  },
  emailVerification: {
    afterEmailVerification: afterEmailVerification,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24,
    sendOnSignUp: true,
    sendVerificationEmail: sendVerificationEmail,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    customRules: {
      "/sign-in/email": { max: 5, window: 60 },
      "/sign-up/email": { max: 3, window: 60 },
    },
  },
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      phoneNumber: { type: "string" },
    },
  },
});

export type BetterAuth = typeof auth.$Infer.Session;
export type BetterAuthErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
