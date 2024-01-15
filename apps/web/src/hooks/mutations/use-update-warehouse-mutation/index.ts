import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { CreateWarehouseMutationVariables } from "@app/screens/warehouse-creator/use-create-warehouse-mutation";
import type { Response } from "types";

type UpdateWarehouseMutation = {
  token: string;
};

type UpdateWarehouseMutationVariables = CreateWarehouseMutationVariables;

type UpdateWarehouseMutationResponse = Response<UpdateWarehouseMutation>;

interface UseUpdateWarehouseMutationParams {
  id: string | null;
}

export const useUpdateWarehouseMutation = (params: UseUpdateWarehouseMutationParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    UpdateWarehouseMutationResponse,
    unknown,
    UpdateWarehouseMutationVariables
  >(
    (options) => {
      if (!params.id) {
        throw new Error("No id");
      }

      const formData = new FormData();

      formData.append("name", options.name);
      formData.append("desc", options.desc);
      formData.append("capacity", options.capacity.toString());
      formData.append("logo", options.logo as Blob);
      formData.append("isPhysical", options.isPhysical?.toString() ?? "false");

      return api.put(API_ENDPOINTS.warehouse.update(params.id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.warehouse.warehouses],
          predicate: (query) => {
            return query.queryKey[1] === params.id || query.queryKey[1] === undefined;
          },
        });
      },
    },
  );

  return mutation;
};
