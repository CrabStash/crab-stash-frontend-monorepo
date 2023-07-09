import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";

import { Button } from "./";

const icons = {
  Mail: Mail,
  None: undefined,
};

const meta: Meta<typeof Button> = {
  title: "Components / Core / Button",
  component: Button,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    loading: false,
    disabled: false,
    icon: undefined,
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
};

export const DefaultSize: Story = {
  args: {
    size: "default",
    children: "Default size",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    children: "Large size",
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    children: "Small size",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,

    children: "Disabled",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
};

export const WithIcon: Story = {
  args: {
    icon: Mail,
    children: "With Icon",
  },
};
