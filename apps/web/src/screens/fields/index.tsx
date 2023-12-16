import { Copy } from "lucide-react";
import { useMemo } from "react";

import type { TableField } from "./fields-table-row-actions";
import FieldsTableRowActions from "./fields-table-row-actions";

import PageTitle from "@app/components/page-title";
import useFieldsQuery from "@app/hooks/queries/use-fields-query";
import usePaginatedTable from "@app/hooks/use-paginated-table";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { ColumnDef } from "@crab-stash/ui";
import { useToast } from "@crab-stash/ui";
import { Table } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";

function Fields() {
  const warehouseId = useWarehouseId();
  const { pageIndex, pagination, setPagination } = usePaginatedTable();
  const { toast } = useToast();
  const { data } = useFieldsQuery({
    page: pageIndex + 1,
  });

  const columns: ColumnDef<TableField>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: () => <>Name</>,
      },
      {
        accessorKey: "type",
        header: () => <>Type</>,
      },
      {
        accessorKey: "id",
        header: () => <>ID</>,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.getValue("id")}
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(row.getValue("id"));

                toast({
                  title: "Copied to clipboard",
                  description: "Field ID copied to clipboard",
                });
              }}
              variant="outline"
              className="w-6 h-6 p-1"
            >
              <Copy size={20} />
            </Button>
          </div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="w-8">
            <FieldsTableRowActions row={row} />
          </div>
        ),
      },
    ],
    [pageIndex],
  );

  const formattedData: TableField[] = useMemo(() => {
    return (
      data?.response.data.list?.map((field) => ({
        id: field.id,
        title: field.title,
        type: field.type,
      })) ?? []
    );
  }, [data]);

  if (!warehouseId) return null;

  return (
    <div className="flex-1">
      <PageTitle className="w-full flex items-center justify-between">Fields</PageTitle>
      <div className="max-w-4xl">
        <Table
          columns={columns}
          data={formattedData}
          pagination={pagination}
          pageCount={data?.response.data.pagination.total}
          onPaginationChange={setPagination}
        />
      </div>
    </div>
  );
}

export default Fields;
