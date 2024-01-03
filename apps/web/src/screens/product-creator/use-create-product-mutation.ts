import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { dashboardQueryKey } from "../dashboard/components/overview/use-dashboard-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { productsQueryKey } from "@app/hooks/queries/use-products-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CreateProductMutationVariables = {
  formData: RJSFSchema;
};

type CreateProductMutationResponse = Response<{ id: string }>;

interface UseCreateProductMutationParams {
  categoryId?: string;
}

export const useCreateProductMutation = (params?: UseCreateProductMutationParams) => {
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = params?.categoryId;
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateProductMutationResponse,
    unknown,
    CreateProductMutationVariables
  >(
    async (options) => {
      if (!warehouseId || !categoryId) {
        throw new Error("No id");
      }

      const { data } = await api.post<CreateProductMutationResponse>(
        API_ENDPOINTS.core.products.create(warehouseId, categoryId),
        options,
      );

      return data;
    },
    {
      onSuccess: () => {
        if (!warehouseId) return;

        queryClient.invalidateQueries([productsQueryKey, warehouseId]);

        queryClient.invalidateQueries([dashboardQueryKey, warehouseId]);

        router.push(URLS.products(warehouseId));
      },
    },
  );

  return mutation;
};
