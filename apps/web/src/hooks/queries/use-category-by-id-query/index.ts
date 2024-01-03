import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";

export type CategoryFormData = {
  title: string;
  description: string;
  parents?: string[];
  properties: string[];
};

export type CategoryByIdQueryResponse = Response<{
  formData: CategoryFormData;
}>;

export const categoryByIdFetcher = async (
  warehouseId: string | null,
  categoryId: string | null,
) => {
  if (!warehouseId || !categoryId) {
    throw new Error("No id");
  }

  const { data } = await api.get<CategoryByIdQueryResponse>(
    API_ENDPOINTS.core.categories.categoryById(warehouseId, categoryId),
  );

  return data;
};

export const categoryByIdQueryKey = "/categories/id";

interface CategoryByIdQueryParams {
  categoryId?: string;
}

export default function useCategoryByIdQuery(params?: CategoryByIdQueryParams) {
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = params?.categoryId || (router.query.categoryId as string);

  const query = useQuery([categoryByIdQueryKey, warehouseId, categoryId], {
    queryFn: () => categoryByIdFetcher(warehouseId, categoryId),
  });

  return query;
}
