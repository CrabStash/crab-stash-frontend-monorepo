import type { Meta, StoryObj } from "@storybook/react";

import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components / Core / Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
