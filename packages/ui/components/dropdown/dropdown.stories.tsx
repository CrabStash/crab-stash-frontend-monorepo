import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import type { DropdownItem } from ".";
import { Dropdown } from ".";

const meta: Meta<typeof Dropdown> = {
  title: "Components / Core / Dropdown",
  component: Dropdown,
};

const items: DropdownItem[] = [
  {
    label: "Item 1",
    shortcut: "⌘+1",
    onClick: () => alert("Item 1 clicked"),
  },
  {
    label: "Item 2",
    shortcut: "⌘+2",
    onClick: () => alert("Item 2 clicked"),
  },
  {
    label: "Item 3",
    shortcut: "⌘+3",
    onClick: () => alert("Item 3 clicked"),
  },
];

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    trigger: <Button>Dropdown</Button>,
    align: "start",
    itemGroups: [items, items],
    label: (
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">shadcn</p>
        <p className="text-xs leading-none text-muted-foreground">m@example.com</p>
      </div>
    ),
    className: "w-64",
  },
};
