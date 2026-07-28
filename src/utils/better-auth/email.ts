import type { BetterAuthOptions } from "better-auth/minimal";

import * as template from "@/emails/index.js";

import { transporter } from "../transporter.js";

type SendResetPasswordEmailFunction = NonNullable<
  BetterAuthOptions["emailAndPassword"]
>["sendResetPassword"];

export const sendResetPasswordEmail: SendResetPasswordEmailFunction = async ({
  user: { name, email },
  url,
}) => {
  void transporter.sendMail({
    from: "Task Manager",
    html: await template.resetPasswordHtml(name, url, "24 hours"),
    subject: "Reset your password",
    text: await template.resetPasswordText(name, url, "24 hours"),
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
  void transporter.sendMail({
    from: "Task Manager",
    html: await template.verifyEmailHtml(name, url, "24 hours"),
    subject: "Verify your email",
    text: await template.verifyEmailText(name, url, "24 hours"),
    to: email,
  });
};

type AfterEmailVerificaton = NonNullable<
  BetterAuthOptions["emailVerification"]
>["afterEmailVerification"];
export const sendWelcomeEmail = async (name: string, email: string) => {
  void transporter.sendMail({
    from: "Task Manager",
    html: await template.welcomeUserHtml(name),
    subject: "Welcome to Task Manager!",
    text: await template.welcomeUserText(name),
    to: email,
  });
};

export const afterEmailVerification: AfterEmailVerificaton = async ({ name, email }) => {
  await sendWelcomeEmail(name, email);
};

export const sendOTPEmail = async ({
  user: { name, email },
  otp,
}: {
  user: { name: string; email: string };
  otp: string;
}) => {
  await transporter.sendMail({
    from: "Task Manager",
    html: await template.emailOtpHtml(name, otp, "5 minutes"),
    subject: "Your verification code",
    text: await template.emailOtpText(name, otp, "5 minutes"),
    to: email,
  });
};
