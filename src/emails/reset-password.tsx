import { Button, pretty, render, Text, toPlainText } from "react-email";

import EmailLayout from "./layout.js";

type ResetPasswordProps = {
  name: string;
  link: string;
  expireTime: string;
};

const ResetPassword = ({ name, link, expireTime }: ResetPasswordProps) => (
  <EmailLayout preview="Reset your password">
    <Text className="text-[16px] m-0 leading-[24px]">Hi {name},</Text>

    <Text className="text-[16px] m-0 mt-[16px] leading-[24px]">
      Someone requested a password reset for your Task Manager account. Click the button below to
      set a new password.
    </Text>

    <Button
      href={link}
      className="bg-[#1c1c1e] text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-bold no-underline box-border inline-block mt-[24px]"
    >
      Reset Password
    </Button>

    <Text className="text-[14px] text-[#6e6e73] m-0 mt-[24px] leading-[20px]">
      If you didn't request this, you can safely ignore this email.
    </Text>

    <Text className="text-[14px] text-[#6e6e73] m-0 mt-[8px] leading-[20px]">
      This reset link will expire in {expireTime}.
    </Text>
  </EmailLayout>
);

ResetPassword.PreviewProps = {
  expireTime: "24 hours",
  link: "https://yourapp.com/reset-password?token=abc123xyz789",
  name: "John Doe",
} satisfies ResetPasswordProps;

export default ResetPassword;

export const resetPasswordHtml = async (name: string, link: string, expireTime: string) =>
  await pretty(await render(<ResetPassword name={name} link={link} expireTime={expireTime} />));
export const resetPasswordText = async (name: string, link: string, expireTime: string) =>
  toPlainText(await resetPasswordHtml(name, link, expireTime));
