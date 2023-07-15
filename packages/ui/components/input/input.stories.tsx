import type { Meta, StoryObj } from "@storybook/react";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Components / Core / Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    disabled: false,
    placeholder: "Email",
    type: "email",
    label: undefined,
    message: undefined,
  },
};

export const WithLabel: Story = {
  args: {
    disabled: false,
    placeholder: "Email",
    type: "email",
    label: "Email",
    message: undefined,
  },
};

export const WithMessage: Story = {
  args: {
    disabled: false,
    placeholder: "Email",
    type: "email",
    label: undefined,
    message: "Please enter your email address",
  },
};

export const WithLabelAndMessage: Story = {
  args: {
    disabled: false,
    placeholder: "Email",
    type: "email",
    label: "Email",
    message: "Please enter your email address",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Email",
    type: "email",
    label: "Email",
    message: "Please enter your email address",
  },
};
