import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";

type Parent = {
  fieldNames: string[];
  id: string;
  title: string;
};

export type CategoryByIdInheritanceQueryResponse = Response<{
  parents: Parent[];
}>;

export const categoryByIdInheritanceFetcher = async (
  warehouseId: string | null,
  categoryId?: string | null,
) => {
  if (!warehouseId || !categoryId) {
    throw new Error("No id");
  }

  const { data } = await api.get<CategoryByIdInheritanceQueryResponse>(
    API_ENDPOINTS.core.categories.categoryInheritanceById(warehouseId, categoryId),
  );

  return data;
};

export const categoryByIdInheritanceQueryKey = "/categories/inheritance/id";

interface CategoryByIdInheritanceQueryParams {
  categoryId?: string;
}

export default function useCategoryByIdInheritanceQuery({
  categoryId,
}: CategoryByIdInheritanceQueryParams) {
  const warehouseId = useWarehouseId();

  const query = useQuery([categoryByIdInheritanceQueryKey, warehouseId, categoryId], {
    queryFn: () => categoryByIdInheritanceFetcher(warehouseId, categoryId),
    // enabled: Boolean(warehouseId && categoryId),
  });

  return query;
}
