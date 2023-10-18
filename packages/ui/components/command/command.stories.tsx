import type { Meta, StoryObj } from "@storybook/react";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";

import { Command } from ".";

const meta: Meta<typeof Command> = {
  title: "Components / Core / Command",
  component: Command,
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {
    groups: [
      {
        heading: "Suggestions",
        items: [
          {
            label: "Calendar",
            icon: <Calendar className="mr-2 h-4 w-4" />,
          },
          {
            label: "Search Emoji",
            icon: <Smile className="mr-2 h-4 w-4" />,
          },
          {
            label: "Calculator",
            icon: <Calculator className="mr-2 h-4 w-4" />,
          },
        ],
      },
      {
        heading: "Settings",
        items: [
          {
            label: "Profile",
            icon: <User className="mr-2 h-4 w-4" />,
          },
          {
            label: "Billing",
            icon: <CreditCard className="mr-2 h-4 w-4" />,
          },
          {
            label: "Settings",
            icon: <Settings className="mr-2 h-4 w-4" />,
          },
        ],
      },
    ],
  },
};
