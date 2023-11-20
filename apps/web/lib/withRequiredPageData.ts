import type { QueryClient } from "@tanstack/react-query";

import type { GetServerSidePropsContext } from "next";

import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { warehouseInfoFetcher } from "@app/hooks/queries/use-warehouse-info-query";
import {
  warehouseUsersFetcher,
  warehouseUsersKey,
} from "@app/hooks/queries/use-warehouse-users-query";
import { warehousesFetcher, warehousesQueryKey } from "@app/hooks/queries/use-warehouses-query";

type Options = {
  withWarehouses?: boolean;
  withCurrentWarehouse?: boolean;
  withWarehouseUsers?: boolean;
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
    options?.withWarehouseUsers &&
      warehouseId &&
      queryClient.prefetchQuery([warehouseUsersKey, warehouseId], () =>
        warehouseUsersFetcher(warehouseId),
      ),
  ]);
}
