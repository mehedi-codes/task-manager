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

type EmailVerificationProps = {
  name: string;
  link: string;
  expireTime: string;
};

const EmailVerification = ({ name, link, expireTime }: EmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your email address</Preview>
        <Body className="bg-white font-sans py-[40px]">
          <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
            {/* Heading */}
            <Section className="mb-[24px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0">
                Verify your email address
              </Heading>
            </Section>

            {/* Greeting */}
            <Section className="mb-[16px]">
              <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
            </Section>

            {/* Instruction */}
            <Section className="mb-[24px]">
              <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
                Please click the button below to verify your email address and complete your account
                setup.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mb-[24px]">
              <Button
                href={link}
                className="bg-black text-white px-[32px] py-[14px] rounded-[8px] text-[16px] font-medium no-underline box-border inline-block"
              >
                Verify Email
              </Button>
            </Section>

            {/* Ignore instruction */}
            <Section className="mb-[16px]">
              <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                If you didn't create an account, you can safely ignore this email.
              </Text>
            </Section>

            {/* Expire time instruction */}
            <Section>
              <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
                This verification link will expire in {expireTime}.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  expireTime: "24 hours",
  link: "https://yourapp.com/verify-email?token=abc123xyz789",
  name: "John Doe",
};

export const emailVerificationHtml = async (name: string, link: string, expireTime: string) =>
  await pretty(await render(<EmailVerification name={name} link={link} expireTime={expireTime} />));
export const emailVerificationText = async (name: string, link: string, expireTime: string) =>
  toPlainText(await emailVerificationHtml(name, link, expireTime));
