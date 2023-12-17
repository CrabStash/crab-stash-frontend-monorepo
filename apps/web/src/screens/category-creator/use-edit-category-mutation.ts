import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { categoriesQueryKey } from "@app/hooks/queries/use-category-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { getCategoryId } from "@app/utils/param-ids";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type EditCategoryMutationVariables = {
  formData: RJSFSchema;
};

type EditCategoryMutationResponse = Response<{ id: string }>;

export const useEditCategoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = getCategoryId(router.query);

  const mutation = useMutation<
    EditCategoryMutationResponse,
    unknown,
    EditCategoryMutationVariables
  >(
    async (options) => {
      if (!warehouseId || !categoryId) {
        throw new Error("No id");
      }

      const { data } = await api.patch<EditCategoryMutationResponse>(
        API_ENDPOINTS.core.categories.edit(warehouseId, categoryId),
        options,
      );

      return data;
    },
    {
      onSuccess: () => {
        if (!warehouseId) return;

        router.push(URLS.categories(warehouseId));

        queryClient.invalidateQueries([categoriesQueryKey, warehouseId]);
      },
    },
  );

  return mutation;
};
