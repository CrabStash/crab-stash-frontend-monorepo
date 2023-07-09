import type { Meta, StoryObj } from "@storybook/react";

import type { SelectItem } from ".";
import { Select } from ".";

const meta: Meta<typeof Select> = {
  title: "Components / Core / Select",
  component: Select,
  decorators: [(Story) => <div className="w-60 flex flex-col gap-4">{Story()}</div>],
};

const items: SelectItem[] = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    disabled: false,
    label: "Label",
    items,
    placeholder: "Select an option",
  },
};

export const WithValue: Story = {
  args: {
    disabled: false,
    label: "Label",
    items,
    placeholder: "Select an option",
    value: "option-2",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Label",
    items,
    placeholder: "Select an option",
  },
};
