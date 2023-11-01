import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";

export type WarehousesQueryResponse = Response<[]>;

export const warehousesFetcher = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await api.get<WarehousesQueryResponse>(API_ENDPOINTS.warehouse.warehouses);
  } catch (error) {
    //
  }

  return {
    response: {
      data: [],
    },
  };
};

export const warehousesQueryKey = API_ENDPOINTS.warehouse.warehouses;

export default function useWarehousesQuery() {
  const query = useQuery([warehousesQueryKey], {
    queryFn: () => warehousesFetcher(),
  });

  return query;
}
