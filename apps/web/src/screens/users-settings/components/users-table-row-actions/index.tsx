import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useRouter } from "next/router";

import { useChangeRoleMutation } from "./use-change-role-mutation";
import { useRemoveUserMutation } from "./use-remove-user-mutation";

import { URLS } from "@app/constants/urls";
import useMeQuery from "@app/hooks/queries/use-me-query";
import useUserRole from "@app/hooks/use-user-role";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Row } from "@crab-stash/ui";
import { useToast } from "@crab-stash/ui";
import { Dialog } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";
import { Dropdown } from "@crab-stash/ui";
import { WarehouseRole } from "types/warehouse-role";

export type TableUser = {
  role: WarehouseRole;
  name: string;
  avatar: string;
  email: string;
  id: string;
};

interface UserTableRowActionsProps {
  row: Row<TableUser>;
  page: number;
}

function UsersTableRowActions({ row, page }: UserTableRowActionsProps) {
  const warehouseId = useWarehouseId();
  const user = row.original;

  const { push } = useRouter();
  const { isAdmin } = useUserRole();
  const { data } = useMeQuery();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const { isLoading, mutateAsync } = useRemoveUserMutation();

  const { mutate } = useChangeRoleMutation({
    warehouseId: warehouseId,
    page,
  });

  const { toast } = useToast();

  const isMe = user.email === data?.response.data.email;
  const isOwner = user.role === WarehouseRole.OWNER;

  const handleDelete = async () => {
    if (!warehouseId) return;

    try {
      await mutateAsync({
        warehouseId: warehouseId,
        userId: user.id,
      });
      toast({
        title: "User removed",
        description: "User has been removed from the warehouse",
      });
      setIsRemoveModalOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User could not be removed from the warehouse",
      });
    }
  };

  const handleRoleChange = (role: WarehouseRole) => {
    if (!warehouseId) return;

    mutate({
      warehouseID: warehouseId,
      targetUserID: user.id,
      newRole: role,
    });
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open {user.email} menu</span>
          </Button>
        }
        itemGroups={[
          [
            {
              label: "Go to profile",
              onClick: () => push(URLS.profile(user.id)),
            },
            {
              label: "Role",
              sub: {
                groupValue: user.role.toString(),
                onValueChange: (value) => {
                  handleRoleChange(parseInt(value));
                },
                radios: [
                  { value: WarehouseRole.OWNER.toString(), label: "Owner" },
                  { value: WarehouseRole.ADMIN.toString(), label: "Admin" },
                  { value: WarehouseRole.MODERATOR.toString(), label: "Moderator" },
                  { value: WarehouseRole.CONTENT_CREATOR.toString(), label: "Content Creator" },
                  { value: WarehouseRole.VIEWER.toString(), label: "Viewer" },
                ].map((radio) => {
                  if (isOwner || !isAdmin) {
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
          ...(!isMe
            ? [
                [
                  {
                    label: "Remove",
                    disabled: !isAdmin,
                    onClick: () => {
                      setIsRemoveModalOpen(true);
                    },
                  },
                ],
              ]
            : []),
        ]}
      />
      <Dialog
        title={`Remove ${user.name}`}
        description={`Are you sure you want to remove ${user.name} from this warehouse?`}
        open={isRemoveModalOpen}
        onOpenChange={(open) => setIsRemoveModalOpen(open)}
        footer={
          <>
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => setIsRemoveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button loading={isLoading} onClick={handleDelete} variant="destructive">
              Remove
            </Button>
          </>
        }
      />
    </>
  );
}

export default UsersTableRowActions;
