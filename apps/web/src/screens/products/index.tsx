import PageTitle from "@app/components/page-title";
import useProductsQuery from "@app/hooks/queries/use-products-query";
import usePaginatedTable from "@app/hooks/use-paginated-table";
import useWarehouseId from "@app/hooks/use-warehouse-id";

function Products() {
  const warehouseId = useWarehouseId();
  const { pageIndex, pagination, setPagination } = usePaginatedTable();

  const { data } = useProductsQuery();

  return (
    <div className="flex-1">
      <PageTitle>Products</PageTitle>
    </div>
  );
}

export default Products;
