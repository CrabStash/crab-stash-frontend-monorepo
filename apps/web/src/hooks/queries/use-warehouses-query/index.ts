import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";
import type { Paginated } from "types/paginated";
import type { WarehouseListItem } from "types/warehouse";

export type WarehousesQueryResponse = Response<Paginated<WarehouseListItem>>;

export const warehousesFetcher = async (page = 1) => {
  const { data } = await api.get<WarehousesQueryResponse>(
    `${API_ENDPOINTS.warehouse.warehouses}?page=${page}`,
  );

  return data;
};

export const warehousesQueryKey = API_ENDPOINTS.warehouse.warehouses;

export default function useWarehousesQuery() {
  const query = useQuery([warehousesQueryKey], {
    queryFn: () => warehousesFetcher(),
  });

  return query;
}
