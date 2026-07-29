import { pretty, render, Text, toPlainText } from "react-email";

import EmailLayout from "./layout.js";

type WelcomeUserProps = {
  name: string;
};

const WelcomeUser = ({ name }: WelcomeUserProps) => (
  <EmailLayout preview="Welcome to Task Manager!">
    <Text className="text-[16px] m-0 leading-[24px]">Hi {name},</Text>

    <Text className="text-[16px] m-0 mt-[16px] leading-[24px]">
      Thank you for signing up with Task Manager! We're thrilled to have you on board.
    </Text>

    <Text className="text-[16px] m-0 mt-[16px] leading-[24px]">
      Your account has been successfully created. Start organizing your tasks, setting priorities,
      and getting things done.
    </Text>

    <Text className="text-[16px] m-0 mt-[24px] leading-[24px]">
      Best Regards,
      <br />
      Task Manager Team
    </Text>
  </EmailLayout>
);

WelcomeUser.PreviewProps = {
  name: "John Doe",
} satisfies WelcomeUserProps;

export default WelcomeUser;

export const welcomeUserHtml = async (name: string) =>
  await pretty(await render(<WelcomeUser name={name} />));
export const welcomeUserText = async (name: string) => toPlainText(await welcomeUserHtml(name));
