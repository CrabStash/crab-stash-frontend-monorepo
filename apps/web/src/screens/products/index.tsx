import { useMemo } from "react";

import type { TableProduct } from "./product-table-row-actions";
import ProductTableRowActions from "./product-table-row-actions";

import PageTitle from "@app/components/page-title";
import useProductsQuery from "@app/hooks/queries/use-products-query";
import usePaginatedTable from "@app/hooks/use-paginated-table";
import type { ColumnDef } from "@crab-stash/ui";
import { Table } from "@crab-stash/ui";

function Products() {
  const { pageIndex, pagination, setPagination } = usePaginatedTable();

  const { data } = useProductsQuery({
    page: pageIndex,
  });

  const columns: ColumnDef<TableProduct>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => <>Name</>,
      },
      {
        accessorKey: "description",
        header: () => <>Type</>,
      },
      {
        accessorKey: "stock",
        header: () => <>Stock</>,
        cell: () => <>5</>,
      },
      {
        accessorKey: "price",
        header: () => <>Price</>,
        cell: () => <>5$</>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="w-8">
            <ProductTableRowActions row={row} />
          </div>
        ),
      },
    ],
    [],
  );

  const formattedData: TableProduct[] = useMemo(() => {
    return (
      data?.response.data.list?.map((product) => ({
        name: product.name,
        description: product.description,
      })) ?? []
    );
  }, [data]);

  return (
    <div className="flex-1">
      <PageTitle>Products</PageTitle>
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

export default Products;
