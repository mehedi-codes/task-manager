import {
  Body,
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

type OtpProps = {
  name: string;
  otp: string;
  expireTime: string;
};

const Otp = ({ name, otp, expireTime }: OtpProps) => (
  <Html lang="en" dir="ltr">
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Head />
      <Preview>Your verification code: {otp}</Preview>
      <Body className="bg-white font-sans py-[40px]">
        <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
          <Section className="mb-[24px]">
            <Heading className="text-[28px] font-bold text-gray-900 m-0">
              Verify your identity
            </Heading>
          </Section>

          <Section className="mb-[16px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Use the following code to complete your sign-in:
            </Text>
          </Section>

          <Section className="mb-[24px] text-center">
            <Text className="text-[36px] font-bold text-gray-900 m-0 tracking-[8px]">{otp}</Text>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-[14px] text-gray-600 m-0 leading-[20px]">
              This code will expire in {expireTime}. If you didn't request this code, you can safely
              ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

Otp.PreviewProps = {
  expireTime: "5 minutes",
  name: "John Doe",
  otp: "123456",
} satisfies OtpProps;

export default Otp;

export const otpHtml = async (name: string, otp: string, expireTime: string) =>
  await pretty(await render(<Otp name={name} otp={otp} expireTime={expireTime} />));
export const otpText = async (name: string, otp: string, expireTime: string) =>
  toPlainText(await otpHtml(name, otp, expireTime));
