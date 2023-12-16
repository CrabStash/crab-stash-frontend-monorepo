import type { Meta, StoryObj } from "@storybook/react";

import type { Tab } from ".";
import { Tabs } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Components / Core / Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

type TabValue = "login" | "register";

const tabs: Tab<TabValue>[] = [
  {
    label: "Login",
    value: "login",
    content: <>Login form</>,
  },
  {
    label: "Register",
    value: "register",
    content: <>Register form</>,
  },
];

export const Default: Story = {
  args: {
    tabs: tabs as Tab<string>[],
    defaultValue: "register",
  },
};
