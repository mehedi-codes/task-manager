import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  pixelBasedPreset,
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

const ResetPassword = ({ name, link, expireTime }: ResetPasswordProps) => (
  <Html lang="en" dir="ltr">
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Head />
      <Preview>Reset your password</Preview>
      <Body className="bg-white font-sans py-[40px]">
        <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
          <Section className="mb-[24px]">
            <Heading className="text-[28px] font-bold text-gray-900 m-0">
              Reset your password
            </Heading>
          </Section>

          <Section className="mb-[16px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Someone requested a password reset for your Task Manager account. Click the button below to set a
              new password.
            </Text>
          </Section>

          <Section className="mb-[24px]">
            <Button
              href={link}
              className="bg-black text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
            >
              Reset Password
            </Button>
          </Section>

          <Section className="mb-[16px]">
            <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
              If you didn't request this, you can safely ignore this email.
            </Text>
          </Section>

          <Section>
            <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
              This reset link will expire in {expireTime}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
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
