//========================
// better-auth plugins
//========================
import { haveIBeenPwned, openAPI, twoFactor } from "better-auth/plugins";
import { sendOTPEmail } from "@/utils/better-auth/email.js";

export const betterAuthPlugins = [
  openAPI({ disableDefaultReference: true }),
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
