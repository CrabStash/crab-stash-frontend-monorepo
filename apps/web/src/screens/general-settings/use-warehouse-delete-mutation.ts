import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";

interface UseWarehouseDeleteMutationParams {
  id: string | null;
}

export const useWarehouseDeleteMutation = (params: UseWarehouseDeleteMutationParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation(
    () => {
      if (!params.id) {
        throw new Error("No id");
      }

      return api.delete(API_ENDPOINTS.warehouse.delete(params.id));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ENDPOINTS.warehouse.warehouses],
          predicate: (query) => query.queryKey[1] !== params.id,
        });

        router.push(URLS.dashboard);
      },
    },
  );

  return mutation;
};
