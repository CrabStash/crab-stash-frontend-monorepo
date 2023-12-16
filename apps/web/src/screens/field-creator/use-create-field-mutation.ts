import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { fieldsQueryKey } from "@app/hooks/queries/use-fields-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { RJSFSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CreateFieldMutationVariables = {
  formData: RJSFSchema;
};

type CreateFieldMutationResponse = Response<{ id: string }>;

export const useCreateFieldMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const warehouseId = useWarehouseId();

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

        queryClient.invalidateQueries({
          queryKey: [fieldsQueryKey, warehouseId],
        });

        router.push(URLS.fields(warehouseId));
      },
    },
  );

  return mutation;
};
