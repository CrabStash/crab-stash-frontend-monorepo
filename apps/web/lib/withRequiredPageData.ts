import type { QueryClient } from "@tanstack/react-query";

import type { GetServerSidePropsContext } from "next";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { warehouseInfoFetcher } from "@app/hooks/queries/use-warehouse-info-query";
import { warehousesFetcher, warehousesQueryKey } from "@app/hooks/queries/use-warehouses-query";

type Options = {
  withWarehouses?: boolean;
  withCurrentWarehouse?: boolean;
};

export async function getRequiredPageData(
  context: GetServerSidePropsContext,
  queryClient: QueryClient,
  options?: Options,
) {
  const warehouseId = getWarehouseId(context.query);

  await Promise.all([
    options?.withWarehouses && queryClient.prefetchQuery([warehousesQueryKey], warehousesFetcher),
    options?.withCurrentWarehouse &&
      warehouseId &&
      queryClient.prefetchQuery([warehousesQueryKey, warehouseId], () =>
        warehouseInfoFetcher(warehouseId),
      ),
  ]);
}
