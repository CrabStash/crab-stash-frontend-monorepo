import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";
import type { Category } from "types/category";

export type CategoriesQueryResponse = Response<{
  list: Category[];
}>;

export const categoriesFetcher = async (warehouseId: string | null, parentId?: string) => {
  if (!warehouseId) {
    throw new Error("No id");
  }

  const { data } = await api.get<CategoriesQueryResponse>(
    API_ENDPOINTS.core.categories.list(warehouseId) + (parentId ? `?category_id=${parentId}` : ""),
  );

  return data;
};

export const categoriesQueryKey = "/categories";

interface UseCategoriesQueryParams {
  parentId?: string;
  enabled?: boolean;
}

export default function useCategoriesQuery(props?: UseCategoriesQueryParams) {
  const warehouseId = useWarehouseId();
  const parentId = props?.parentId;

  const query = useQuery([categoriesQueryKey, warehouseId, parentId], {
    queryFn: () => categoriesFetcher(warehouseId, parentId),
    enabled: props?.enabled,
  });

  return query;
}
