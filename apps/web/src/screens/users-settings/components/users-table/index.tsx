import { useMemo } from "react";

import { useRouter } from "next/router";

import type { TableUser } from "../users-table-row-actions";
import UsersTableRowActions from "../users-table-row-actions";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import useWarehouseUsersQuery from "@app/hooks/queries/use-warehouse-users-query";
import { formatRole } from "@app/utils/formatRole";
import type { ColumnDef } from "@crab-stash/ui";
import { Avatar, Table } from "@crab-stash/ui";
import type { WarehouseRole } from "types/warehouse-role";

const columns: ColumnDef<TableUser>[] = [
  {
    accessorKey: "avatar",
    header: () => <div className="w-80px">Avatar</div>,
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Avatar fullName={row.getValue("name")} />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <>Email</>,
  },
  {
    accessorKey: "name",
    header: () => <>Name</>,
  },
  {
    accessorKey: "role",
    header: () => <>Role</>,
    cell: ({ row }) => formatRole(row.getValue("role") as WarehouseRole),
  },
  {
    id: "actions",
    cell: ({ row }) => <UsersTableRowActions row={row} />,
  },
];

function UsersTable() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const { data } = useWarehouseUsersQuery({
    id: warehouseId,
  });

  const formattedData: TableUser[] = useMemo(() => {
    return (
      data?.response.data.list.map(({ user, role }) => ({
        id: user.email,
        name: user.firstName + " " + user.lastName,
        role: role,
        avatar: user.avatar,
      })) ?? []
    );
  }, [data]);

  return <Table columns={columns} data={formattedData} className="max-w-4xl" />;
}

export default UsersTable;
