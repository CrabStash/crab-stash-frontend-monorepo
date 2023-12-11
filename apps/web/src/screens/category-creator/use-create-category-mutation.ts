import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { categoriesQueryKey } from "@app/hooks/queries/use-category-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CreateCategoryMutationVariables = {
  formData: RJSFSchema;
};

type CreateCategoryMutationResponse = Response<{ id: string }>;

export const useCreateCategoryMutation = () => {
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateCategoryMutationResponse,
    unknown,
    CreateCategoryMutationVariables
  >(
    async (options) => {
      if (!warehouseId) {
        throw new Error("No id");
      }

      const { data } = await api.post<CreateCategoryMutationResponse>(
        API_ENDPOINTS.core.categories.create(warehouseId),
        options,
      );

      return data;
    },
    {
      onSuccess: () => {
        if (!warehouseId) return;

        queryClient.invalidateQueries({
          queryKey: [categoriesQueryKey, warehouseId],
        });

        router.push(URLS.categories(warehouseId));
      },
    },
  );

  return mutation;
};
