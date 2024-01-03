import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { warehouseUsersKey } from "@app/hooks/queries/use-warehouse-users-query";
import { dashboardQueryKey } from "@app/screens/dashboard/components/overview/use-dashboard-query";
import type { Response } from "types";

type RemoveUserMutationVariables = {
  warehouseId: string;
  userId: string;
};

type RemoveUserMutationResponse = Response<string>;

export const useRemoveUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<RemoveUserMutationResponse, unknown, RemoveUserMutationVariables>(
    (options) => {
      return api.delete(API_ENDPOINTS.warehouse.removeUser(options.warehouseId, options.userId));
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [warehouseUsersKey, variables.warehouseId],
        });

        queryClient.invalidateQueries([dashboardQueryKey, variables.warehouseId]);
      },
    },
  );

  return mutation;
};
