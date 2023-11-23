import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { warehouseUsersKey } from "@app/hooks/queries/use-warehouse-users-query";
import type { Response } from "types";

type AddWarehouseUserMutationVariables = {
  warehouseID: string;
  email: string;
};

type AddWarehouseUserMutationResponse = Response<string>;

export const useAddWarehouseUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AddWarehouseUserMutationResponse,
    unknown,
    AddWarehouseUserMutationVariables
  >(
    (options) => {
      return api.post(API_ENDPOINTS.warehouse.addUser, options);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [warehouseUsersKey, variables.warehouseID],
        });
      },
    },
  );

  return mutation;
};
