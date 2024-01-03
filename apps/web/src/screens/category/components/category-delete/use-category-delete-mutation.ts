import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { categoryByIdQueryKey } from "@app/hooks/queries/use-category-by-id-query";
import { categoriesQueryKey } from "@app/hooks/queries/use-category-query";
import { productsQueryKey } from "@app/hooks/queries/use-products-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { dashboardQueryKey } from "@app/screens/dashboard/components/overview/use-dashboard-query";

interface UseCategoryDeleteMutationParams {
  categoryId: string | null;
}

export const useCategoryDeleteMutation = (params: UseCategoryDeleteMutationParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const warehouseId = useWarehouseId();

  const mutation = useMutation(
    () => {
      if (!params.categoryId || !warehouseId) {
        throw new Error("No id");
      }

      return api.delete(API_ENDPOINTS.core.categories.delete(warehouseId, params.categoryId));
    },
    {
      onSuccess: () => {
        if (!params.categoryId || !warehouseId) {
          return;
        }

        queryClient.invalidateQueries({
          queryKey: [categoryByIdQueryKey, warehouseId, params.categoryId],
        });

        queryClient.invalidateQueries({
          queryKey: [categoriesQueryKey, warehouseId],
          predicate: (query) =>
            query.queryKey[2] === params.categoryId || query.queryKey[2] === undefined,
        });

        queryClient.invalidateQueries([dashboardQueryKey, warehouseId]);

        queryClient.invalidateQueries([productsQueryKey, warehouseId]);

        router.push(URLS.categories(warehouseId));
      },
    },
  );

  return mutation;
};
