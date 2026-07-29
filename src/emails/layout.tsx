import type { ReactNode } from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "react-email";

type EmailLayoutProps = {
  children: ReactNode;
  preview?: string;
};

const EmailLayout = ({ children, preview }: EmailLayoutProps) => (
  <Html lang="en" dir="ltr">
    <Tailwind config={{ presets: [pixelBasedPreset] }}>
      <Head />
      <Body className="bg-white font-sans py-[48px] px-[16px]">
        {preview && <Preview>{preview}</Preview>}
        <Container className="mx-auto max-w-[480px] w-full">
          <Section className="text-center mb-[32px]">
            <Text className="text-[48px] leading-[1] m-0">📓</Text>
            <Heading className="text-[22px] font-semibold text-[#1c1c1e] m-0 mt-[8px]">
              Task Manager
            </Heading>
          </Section>

          <Section className="bg-[#f5f5f5] rounded-[16px] p-[32px] text-[#1c1c1e]">
            {children}
          </Section>

          <Section className="text-center mt-[24px]">
            <Text className="text-[12px] text-[#6e6e73] m-0">
              Built by{" "}
              <Link href="https://mehedi.engineer" className="text-[#6e6e73] underline">
                Mehedi Hasan
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailLayout;
