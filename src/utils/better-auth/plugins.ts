//========================
// better-auth plugins
//========================

import type { BetterAuthOptions } from "better-auth/minimal";
import { haveIBeenPwned, openAPI, twoFactor } from "better-auth/plugins";
import { sendOTPEmail } from "@/utils/better-auth/email.js";

export const betterAuthPlugins: NonNullable<BetterAuthOptions["plugins"]> = [
  openAPI(),
  haveIBeenPwned(),
  twoFactor({
    otpOptions: {
      allowedAttempts: 5,
      digits: 6,
      period: 5,
      sendOTP: sendOTPEmail,
      storeOTP: "encrypted",
    },
  }),
];
