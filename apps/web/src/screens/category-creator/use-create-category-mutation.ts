import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CreateCategoryMutationVariables = {
  formData: RJSFSchema;
};

type CreateCategoryMutationResponse = Response<{ id: string }>;

export const useCreateCategoryMutation = () => {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);

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

        router.push(URLS.categories(warehouseId));
      },
    },
  );

  return mutation;
};
