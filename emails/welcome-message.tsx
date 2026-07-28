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

type WelcomeMessageProps = {
  name: string;
};

const WelcomeMessage = ({ name }: WelcomeMessageProps) => (
  <Html lang="en" dir="ltr">
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Head />
      <Preview>Welcome to BetterAuth Organization!</Preview>
      <Body className="bg-white font-sans py-[40px]">
        <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
          <Section className="mb-[24px]">
            <Heading className="text-[28px] font-bold text-gray-900 m-0">
              Welcome to BetterAuth Organization!
            </Heading>
          </Section>

          <Section className="mb-[16px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Thank you for signing up with BetterAuth Organization! We're absolutely thrilled to
              have you join our growing community of developers and organizations who trust us with
              their authentication needs.
            </Text>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px] mt-[16px]">
              Your account has been successfully created and you're now part of a platform designed
              to make authentication simple, secure, and reliable. We're committed to providing you
              with the best possible experience as you explore everything BetterAuth has to offer.
            </Text>
          </Section>

          <Section>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Best Regards,
              <br />
              BAO Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeMessage.PreviewProps = {
  name: "John Doe",
} satisfies WelcomeMessageProps;

export default WelcomeMessage;

export const welcomeMessageHtml = async (name: string) =>
  await pretty(await render(<WelcomeMessage name={name} />));
export const welcomeMessageText = async (name: string) =>
  toPlainText(await welcomeMessageHtml(name));
