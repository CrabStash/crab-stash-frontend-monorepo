import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { dashboardQueryKey } from "../dashboard/components/overview/use-dashboard-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { productByIdQueryKey } from "@app/hooks/queries/use-product-by-id-query";
import { productsQueryKey } from "@app/hooks/queries/use-products-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getProductId } from "@app/utils/param-ids";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type EditProductMutationVariables = {
  formData: RJSFSchema;
};

type EditProductMutationResponse = Response<{ id: string }>;

interface UseEditProductMutationParams {
  categoryId?: string | null;
}

export const useEditProductMutation = ({ categoryId }: UseEditProductMutationParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const productId = getProductId(router.query);

  const mutation = useMutation<EditProductMutationResponse, unknown, EditProductMutationVariables>(
    async (options) => {
      if (!warehouseId || !productId || !categoryId) {
        throw new Error("No id");
      }

      const { data } = await api.patch<EditProductMutationResponse>(
        API_ENDPOINTS.core.products.edit(warehouseId, productId, categoryId),
        options,
      );

      return data;
    },
    {
      onSuccess: () => {
        if (!warehouseId) return;

        router.push(URLS.products(warehouseId));

        queryClient.invalidateQueries([productsQueryKey, warehouseId]);

        queryClient.invalidateQueries([productByIdQueryKey, warehouseId, categoryId, productId]);

        queryClient.invalidateQueries([dashboardQueryKey, warehouseId]);
      },
    },
  );

  return mutation;
};
