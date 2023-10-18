import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { Dialog } from ".";

const meta: Meta<typeof Dialog> = {
  title: "Components / Core / Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    trigger: <Button>Dialog</Button>,
    title: "Dialog title",
    description: "Dialog description",
    content: (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" defaultValue="@peduarte" className="col-span-3" />
        </div>
      </div>
    ),
    footer: <Button type="submit">Save changes</Button>,
  },
};
