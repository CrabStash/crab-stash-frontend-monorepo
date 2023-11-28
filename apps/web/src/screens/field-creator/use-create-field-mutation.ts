import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CreateFieldMutationVariables = {
  formData: RJSFSchema;
};

type CreateFieldMutationResponse = Response<{ id: string }>;

export const useCreateFieldMutation = () => {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);

  const mutation = useMutation<CreateFieldMutationResponse, unknown, CreateFieldMutationVariables>(
    async (options) => {
      if (!warehouseId) {
        throw new Error("No id");
      }

      const { data } = await api.post<CreateFieldMutationResponse>(
        API_ENDPOINTS.core.fields.create(warehouseId),
        options,
      );

      return data;
    },
    {
      onSuccess: () => {
        if (!warehouseId) return;

        router.push(URLS.fields(warehouseId));
      },
    },
  );

  return mutation;
};
