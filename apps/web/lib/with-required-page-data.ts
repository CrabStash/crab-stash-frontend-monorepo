import type { QueryClient } from "@tanstack/react-query";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import { URLS } from "@app/constants/urls";
import {
  categoryByIdFetcher,
  categoryByIdQueryKey,
} from "@app/hooks/queries/use-category-by-id-query";
import { fieldsFetcher, fieldsQueryKey } from "@app/hooks/queries/use-fields-query";
import type { WarehouseQueryResponse } from "@app/hooks/queries/use-warehouse-info-query";
import { warehouseInfoFetcher } from "@app/hooks/queries/use-warehouse-info-query";
import {
  warehouseUsersFetcher,
  warehouseUsersKey,
} from "@app/hooks/queries/use-warehouse-users-query";
import { warehousesFetcher, warehousesQueryKey } from "@app/hooks/queries/use-warehouses-query";
import { getCategoryId, getWarehouseId } from "@app/utils/param-ids";
import { formatIdToQuery } from "@app/utils/queryIds";
import type { WarehouseRole } from "types/warehouse-role";

const hasRequiredRole = (warehouseRole?: WarehouseRole, requiredRole?: WarehouseRole) => {
  if (!warehouseRole || !requiredRole) {
    return false;
  }

  if (warehouseRole >= requiredRole) {
    return true;
  }

  return false;
};

type Options = {
  withWarehouses?: boolean;
  withCurrentWarehouse?: boolean;
  withWarehouseUsers?: boolean;
  withWarehouseFields?: boolean;
  withCurrentCategory?: boolean;
  withCurrentProduct?: boolean;
  requiredRole?: WarehouseRole;
};

export async function withRequiredPageData({
  callback,
  options,
  queryClient,
  context,
}: {
  callback: () => ReturnType<GetServerSideProps>;
  queryClient: QueryClient;
  context: GetServerSidePropsContext;
  options?: Options;
}) {
  const warehouseId = getWarehouseId(context.query);
  const categoryId = getCategoryId(context.query);

  await Promise.all([
    options?.withWarehouses &&
      queryClient.prefetchQuery([warehousesQueryKey], () => warehousesFetcher()),
    options?.withCurrentWarehouse &&
      warehouseId &&
      queryClient.prefetchQuery([warehousesQueryKey, warehouseId], () =>
        warehouseInfoFetcher(warehouseId),
      ),
  ]);

  const warehouse = queryClient.getQueryData<WarehouseQueryResponse>([
    warehousesQueryKey,
    warehouseId,
  ]);
  const warehouseRole = warehouse?.response?.data?.role;

  if (options?.requiredRole && warehouseId) {
    if (!hasRequiredRole(warehouseRole, options.requiredRole)) {
      return {
        redirect: {
          destination: `${URLS.warehouseDashboard(
            formatIdToQuery(warehouseId),
          )}?permissionDenied=true`,
          permanent: false,
        },
      };
    }
  }

  await Promise.all([
    options?.withWarehouseUsers &&
      warehouseId &&
      queryClient.prefetchQuery([warehouseUsersKey, warehouseId, 1], () =>
        warehouseUsersFetcher(warehouseId),
      ),
    options?.withWarehouseFields &&
      warehouseId &&
      queryClient.prefetchQuery([fieldsQueryKey, warehouseId, 1], () => fieldsFetcher(warehouseId)),
    options?.withCurrentCategory &&
      warehouseId &&
      categoryId &&
      queryClient.prefetchQuery([categoryByIdQueryKey, warehouseId, categoryId], () =>
        categoryByIdFetcher(warehouseId, categoryId),
      ),
  ]);

  return callback();
}
