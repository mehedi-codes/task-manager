import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  pretty,
  render,
  Section,
  Tailwind,
  Text,
  toPlainText,
} from "react-email";

type ResetPasswordProps = {
  name: string;
  link: string;
  expireTime: string;
};

const ResetPassword = ({ name, link, expireTime }: ResetPasswordProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password</Preview>
        <Body className="bg-white font-sans py-[40px]">
          <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
            {/* Heading */}
            <Section className="mb-[24px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0">
                Reset your password
              </Heading>
            </Section>

            {/* Greeting */}
            <Section className="mb-[16px]">
              <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
            </Section>

            {/* Instruction */}
            <Section className="mb-[24px]">
              <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
                We received a request to reset your password. Click the button below to create a new
                password for your account.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mb-[24px]">
              <Button
                href={link}
                className="bg-red-600 text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Security notice */}
            <Section className="mb-[16px]">
              <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                If you didn't request a password reset, you can safely ignore this email. Your
                password will remain unchanged.
              </Text>
            </Section>

            {/* Expire time instruction */}
            <Section>
              <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                This password reset link will expire in {expireTime}.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ResetPassword.PreviewProps = {
  expireTime: "1 hour",
  link: "https://yourapp.com/reset-password?token=abc123xyz789",
  name: "John Doe",
};

export const resetPasswordHtml = async (name: string, link: string, expireTime: string) =>
  await pretty(await render(<ResetPassword name={name} link={link} expireTime={expireTime} />));
export const resetPasswordText = async (name: string, link: string, expireTime: string) =>
  toPlainText(await resetPasswordHtml(name, link, expireTime));
