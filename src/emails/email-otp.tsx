import { pretty, render, Text, toPlainText } from "react-email";

import EmailLayout from "./layout.js";

type EmailOtpProps = {
  name: string;
  otp: string;
  expireTime: string;
};

const EmailOtp = ({ name, otp, expireTime }: EmailOtpProps) => (
  <EmailLayout preview={`Your verification code: ${otp}`}>
    <Text className="text-[16px] m-0 leading-[24px]">Hi {name},</Text>

    <Text className="text-[16px] m-0 mt-[16px] leading-[24px]">
      Use the following code to complete your sign-in to Task Manager:
    </Text>

    <Text className="text-[36px] font-bold m-0 mt-[24px] text-center tracking-[8px]">{otp}</Text>

    <Text className="text-[14px] text-[#6e6e73] m-0 mt-[24px] leading-[20px]">
      This code will expire in {expireTime}. If you didn't request this code, you can safely ignore
      this email.
    </Text>
  </EmailLayout>
);

EmailOtp.PreviewProps = {
  expireTime: "5 minutes",
  name: "John Doe",
  otp: "123456",
} satisfies EmailOtpProps;

export default EmailOtp;

export const emailOtpHtml = async (name: string, otp: string, expireTime: string) =>
  await pretty(await render(<EmailOtp name={name} otp={otp} expireTime={expireTime} />));
export const emailOtpText = async (name: string, otp: string, expireTime: string) =>
  toPlainText(await emailOtpHtml(name, otp, expireTime));
