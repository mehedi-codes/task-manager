import type { BetterAuthOptions } from "better-auth/minimal";
import { transporter } from "../transporter.js";

type SendResetPasswordEmailFunction = NonNullable<
  BetterAuthOptions["emailAndPassword"]
>["sendResetPassword"];

export const sendResetPasswordEmail: SendResetPasswordEmailFunction = async ({
  user: { name, email },
  url,
}) => {
  const { resetPasswordHtml, resetPasswordText } = await import(
    "./templates/reset-password.js"
  );
  void transporter.sendMail({
    from: "BetterAuth Organization <support@betterauth-org.com",
    html: await resetPasswordHtml(name, url, "24 hours"),
    subject: "Reset your password",
    text: await resetPasswordText(name, url, "24 hours"),
    to: email,
  });
};

type SendVerificationEmailFunction = NonNullable<
  BetterAuthOptions["emailVerification"]
>["sendVerificationEmail"];
export const sendVerificationEmail: SendVerificationEmailFunction = async ({
  user: { name, email },
  url,
}) => {
  const { emailVerificationHtml, emailVerificationText } = await import(
    "./templates/email-verification.js"
  );
  void transporter.sendMail({
    from: "BetterAuth Organization <support@betterauth-org.com",
    html: await emailVerificationHtml(name, url, "24 hours"),
    subject: "Verify your email",
    text: await emailVerificationText(name, url, "24 hours"),
    to: email,
  });
};

type AfterEmailVerificaton = NonNullable<
  BetterAuthOptions["emailVerification"]
>["afterEmailVerification"];
export const sendWelcomeEmail = async (name: string, email: string) => {
  const { welcomeMessageHtml, welcomeMessageText } = await import(
    "./templates/welcome-message.js"
  );
  void transporter.sendMail({
    from: "BetterAuth Organization <support@betterauth-org.com",
    html: await welcomeMessageHtml(name),
    subject: "Welcome to BetterAuth Organization!",
    text: await welcomeMessageText(name),
    to: email,
  });
};

export const afterEmailVerification: AfterEmailVerificaton = async ({ name, email }) => {
  await sendWelcomeEmail(name, email);
};

export const sendOTPEmail = async ({
  user: { name, email },
  otp,
}: { user: { name: string; email: string }; otp: string }) => {
  const { otpHtml, otpText } = await import("./templates/otp.js");
  await transporter.sendMail({
    from: "BetterAuth Organization <support@betterauth-org.com",
    html: await otpHtml(name, otp, "5 minutes"),
    subject: "Your verification code",
    text: await otpText(name, otp, "5 minutes"),
    to: email,
  });
};
