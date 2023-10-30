import type { QueryClient } from "@tanstack/react-query";

import { warehousesFetcher, warehousesQueryKey } from "@app/hooks/use-warehouses-query";

type Options = {
  withWarehouses?: boolean;
};

export async function getRequiredPageData(queryClient: QueryClient, options?: Options) {
  await Promise.all([
    options?.withWarehouses && queryClient.prefetchQuery([warehousesQueryKey], warehousesFetcher),
  ]);
}
