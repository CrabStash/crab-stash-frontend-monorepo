import type { Meta, StoryObj } from "@storybook/react";

import { Label } from ".";

const meta: Meta<typeof Label> = {
  title: "Components / Core / Label",
  component: Label,
  decorators: [(Story) => <div className="w-60 flex flex-col gap-4">{Story()}</div>],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
