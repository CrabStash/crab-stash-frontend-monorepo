import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";

export type DashboardQueryResponse = Response<{
  employees: number;
  entitiesCount: {
    all: number;
    unique: number;
  };
  warehouseValue: number;
  newestEntities?: {
    name: string;
    description: string;
    category_id: string;
    price: number;
  }[];
}>;

export const dashboardFetcher = async (warehouseId?: string | null) => {
  if (!warehouseId) {
    throw new Error("Warehouse id is required");
  }

  const { data } = await api.get<DashboardQueryResponse>(
    API_ENDPOINTS.warehouse.dashboard(warehouseId),
  );

  return data;
};

export const dashboardQueryKey = "/dashboard";

export default function useDashboardQuery() {
  const warehouseId = useWarehouseId();

  const query = useQuery([dashboardQueryKey, warehouseId], {
    queryFn: () => dashboardFetcher(warehouseId),
  });

  return query;
}
