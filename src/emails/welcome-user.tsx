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

type WelcomeUserProps = {
  name: string;
};

const WelcomeUser = ({ name }: WelcomeUserProps) => (
  <Html lang="en" dir="ltr">
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Head />
      <Preview>Welcome to Task Manager!</Preview>
      <Body className="bg-white font-sans py-[40px]">
        <Container className="bg-gray-100 mx-auto p-[24px] w-full rounded-[12px]">
          <Section className="mb-[24px]">
            <Heading className="text-[28px] font-bold text-gray-900 m-0">
              Welcome to Task Manager!
            </Heading>
          </Section>

          <Section className="mb-[16px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">Hi {name},</Text>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Thank you for signing up with Task Manager! We're thrilled to have you on board.
            </Text>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px] mt-[16px]">
              Your account has been successfully created. Start organizing your tasks, setting
              priorities, and getting things done.
            </Text>
          </Section>

          <Section>
            <Text className="text-[16px] text-gray-700 m-0 leading-[24px]">
              Best Regards,
              <br />
              Task Manager Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeUser.PreviewProps = {
  name: "John Doe",
} satisfies WelcomeUserProps;

export default WelcomeUser;

export const welcomeUserHtml = async (name: string) =>
  await pretty(await render(<WelcomeUser name={name} />));
export const welcomeUserText = async (name: string) =>
  toPlainText(await welcomeUserHtml(name));
