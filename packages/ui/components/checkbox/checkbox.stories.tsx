import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Components / Core / Checkbox",
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    disabled: false,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    message: "You agree to our Terms of Service and Privacy Policy.",
  },
};

export const DefaultChecked: Story = {
  args: {
    disabled: false,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    message: "You agree to our Terms of Service and Privacy Policy.",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    message: "You agree to our Terms of Service and Privacy Policy.",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    message: "You agree to our Terms of Service and Privacy Policy.",
    defaultChecked: true,
  },
};
