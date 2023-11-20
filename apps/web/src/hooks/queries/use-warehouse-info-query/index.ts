import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";
import type { Warehouse } from "types/warehouse";
import type { WarehouseRole } from "types/warehouse-role";

export type WarehousesQueryResponse = Response<
  Warehouse &
    WarehouseRole & {
      isPhysical: boolean;
    }
>;

export const warehouseInfoFetcher = async (id: string | null) => {
  if (!id) {
    throw new Error("No id");
  }

  const { data } = await api.get<WarehousesQueryResponse>(API_ENDPOINTS.warehouse.info(id));

  return data;
};

export const warehousesQueryKey = API_ENDPOINTS.warehouse.warehouses;

interface UseWarehouseInfoQueryParams {
  id: string | null;
}

export default function useWarehouseInfoQuery(params: UseWarehouseInfoQueryParams) {
  const query = useQuery([warehousesQueryKey, params.id], {
    queryFn: () => warehouseInfoFetcher(params.id),
  });

  return query;
}
