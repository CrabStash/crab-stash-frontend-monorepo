import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from ".";

const meta: Meta<typeof Textarea> = {
  title: "Components / Core / Textarea",
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Textarea",
    className: "w-64",
  },
};
