import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { WarehouseUsersQueryResponse } from "@app/hooks/queries/use-warehouse-users-query";
import { warehouseUsersKey } from "@app/hooks/queries/use-warehouse-users-query";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";
import type { WarehouseRole } from "types/warehouse-role";

type ChangeRoleMutationVariables = {
  warehouseID: string;
  targetUserID: string;
  newRole: WarehouseRole;
};

type ChangeRoleMutationResponse = Response<string>;

interface ChangeRoleMutationsParams {
  page: number;
  warehouseId: string | null;
}

export const useChangeRoleMutation = ({ page, warehouseId }: ChangeRoleMutationsParams) => {
  const queryClient = useQueryClient();
  const queryKey = [warehouseUsersKey, warehouseId, page];
  const { toast } = useToast();

  const mutation = useMutation<ChangeRoleMutationResponse, unknown, ChangeRoleMutationVariables>(
    async (options) => {
      return api.put(API_ENDPOINTS.warehouse.changeUserRole, options);
    },
    {
      onMutate: async ({ newRole, targetUserID }) => {
        await queryClient.cancelQueries({ queryKey: queryKey });

        const previousWarehouses = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old: WarehouseUsersQueryResponse) => {
          const users = old.response.data.list?.map((user) => {
            if (user.user.id === targetUserID) {
              return {
                ...user,
                role: newRole,
              };
            }

            return user;
          });

          return {
            ...old,
            response: {
              data: {
                ...old.response.data,
                list: users,
              },
            },
          };
        });

        return { previousWarehouses };
      },
      onError: (
        _,
        __,
        context: {
          previousWarehouses: unknown;
        },
      ) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User role could not be changed",
        });
        queryClient.setQueryData(queryKey, context.previousWarehouses);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [warehouseUsersKey, warehouseId] });
      },
    },
  );

  return mutation;
};
