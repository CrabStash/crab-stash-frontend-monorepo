import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import useMeQuery from "@app/hooks/queries/use-me-query";
import type { Row } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";
import { Dropdown } from "@crab-stash/ui";
import { WarehouseRole } from "types/warehouse-role";

export type TableUser = {
  role: WarehouseRole;
  name: string;
  avatar: string;
  id: string;
};

interface UserTableRowActionsProps {
  row: Row<TableUser>;
}

function UsersTableRowActions({ row }: UserTableRowActionsProps) {
  const user = row.original;
  const { data } = useMeQuery();

  const isMe = user.id === data?.response.data.email;
  const isOwner = user.role === WarehouseRole.OWNER;

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      }
      itemGroups={[
        [
          {
            label: "Go to profile",
          },
          {
            label: "Role",
            sub: {
              groupValue: user.role.toString(),
              radios: [
                { value: WarehouseRole.OWNER.toString(), label: "Owner" },
                { value: WarehouseRole.ADMIN.toString(), label: "Admin" },
                { value: WarehouseRole.MODERATOR.toString(), label: "Moderator" },
                { value: WarehouseRole.CONTENT_CREATOR.toString(), label: "Content Creator" },
                { value: WarehouseRole.VIEWER.toString(), label: "Viewer" },
              ].map((radio) => {
                if (isOwner) {
                  return {
                    ...radio,
                    disabled: true,
                  };
                }

                return radio;
              }),
            },
          },
        ],
        ...(!isMe ? [[{ label: "Remove" }]] : []),
      ]}
    />
  );
}

export default UsersTableRowActions;
