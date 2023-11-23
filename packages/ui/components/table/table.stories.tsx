import type { Meta, StoryObj } from "@storybook/react";

import { Table } from ".";

const meta: Meta<typeof Table> = {
  title: "Components / Core / Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      {
        header: "Email",
        accessorKey: "id",
      },
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
    ],
    data: [
      {
        id: "john.doe@gmail.com",
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: "jane.doe@gmail.com",
        firstName: "Jane",
        lastName: "Doe",
      },
    ],
    pageCount: 1,
  },
};
