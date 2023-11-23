import { useMemo, useState } from "react";

import { useRouter } from "next/router";

import type { TableUser } from "../users-table-row-actions";
import UsersTableRowActions from "../users-table-row-actions";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import useWarehouseUsersQuery from "@app/hooks/queries/use-warehouse-users-query";
import { formatRole } from "@app/utils/formatRole";
import type { ColumnDef, PaginationState } from "@crab-stash/ui";
import { Avatar, Table } from "@crab-stash/ui";
import type { WarehouseRole } from "types/warehouse-role";

function UsersTable() {
  const { query } = useRouter();
  const warehouseId = getWarehouseId(query);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useWarehouseUsersQuery({
    id: warehouseId,
    page: pageIndex + 1,
  });

  const columns: ColumnDef<TableUser>[] = useMemo(
    () => [
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
        accessorKey: "email",
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
        cell: ({ row }) => <UsersTableRowActions page={pageIndex + 1} row={row} />,
      },
    ],
    [pageIndex],
  );

  const formattedData: TableUser[] = useMemo(() => {
    return (
      data?.response.data.list.map(({ user, role }) => ({
        id: user.id,
        email: user.email,
        name: user.firstName + " " + user.lastName,
        role: role,
        avatar: user.avatar,
      })) ?? []
    );
  }, [data]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  if (!data?.response) return null;

  return (
    <Table
      columns={columns}
      data={formattedData}
      pagination={pagination}
      pageCount={data.response.data.pagination.total}
      onPaginationChange={setPagination}
    />
  );
}

export default UsersTable;
