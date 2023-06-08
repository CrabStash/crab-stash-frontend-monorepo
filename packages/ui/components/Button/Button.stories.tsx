import type { Meta, Story } from "@storybook/react";

import { Button } from "./";
import { ButtonProps } from "./Button";
import { Mail } from "lucide-react";

const icons = {
  Mail: Mail,
  None: undefined,
};

const meta: Meta<ButtonProps> = {
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
  decorators: [(Story) => <div className="w-60 flex flex-col gap-4">{Story()}</div>],
};

export default meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

export const Playground = Template.bind({});

Playground.args = {
  variant: "default",
  size: "default",
  loading: false,
  disabled: false,
  icon: undefined,
};

export const Variants = () => (
  <>
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="destructive">Destructive</Button>
  </>
);

export const Sizes = () => (
  <>
    <Button size="default">Normal</Button>
    <Button size="lg">Medium</Button>
    <Button size="sm">Small</Button>
  </>
);

export const OtherStates = () => (
  <>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
    <Button icon={Mail}>With Icon</Button>
  </>
);
