import { Button, pretty, render, Text, toPlainText } from "react-email";

import EmailLayout from "./layout.tsx";

type VerifyEmailProps = {
  name: string;
  link: string;
  expireTime: string;
};

const VerifyEmail = ({ name, link, expireTime }: VerifyEmailProps) => (
  <EmailLayout preview="Verify your email address">
    <Text className="text-[16px] m-0 leading-[24px]">Hi {name},</Text>

    <Text className="text-[16px] m-0 mt-[16px] leading-[24px]">
      Please click the button below to verify your email address and complete your Task Manager
      account setup.
    </Text>

    <Button
      href={link}
      className="bg-[#1c1c1e] text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-bold no-underline box-border inline-block mt-[24px]"
    >
      Verify Email
    </Button>

    <Text className="text-[14px] text-[#6e6e73] m-0 mt-[24px] leading-[20px]">
      If you didn't create an account, you can safely ignore this email.
    </Text>

    <Text className="text-[14px] text-[#6e6e73] m-0 mt-[8px] leading-[20px]">
      This verification link will expire in {expireTime}.
    </Text>
  </EmailLayout>
);

VerifyEmail.PreviewProps = {
  expireTime: "24 hours",
  link: "https://yourapp.com/verify-email?token=abc123xyz789",
  name: "John Doe",
} satisfies VerifyEmailProps;

export default VerifyEmail;

export const verifyEmailHtml = async (name: string, link: string, expireTime: string) =>
  await pretty(await render(<VerifyEmail name={name} link={link} expireTime={expireTime} />));
export const verifyEmailText = async (name: string, link: string, expireTime: string) =>
  toPlainText(await verifyEmailHtml(name, link, expireTime));
