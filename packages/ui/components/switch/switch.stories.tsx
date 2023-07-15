import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  title: "Components / Core / Switch",
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    disabled: false,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const Checked: Story = {
  args: {
    disabled: false,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const CheckedDisabled: Story = {
  args: {
    disabled: true,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    defaultChecked: true,
  },
};
