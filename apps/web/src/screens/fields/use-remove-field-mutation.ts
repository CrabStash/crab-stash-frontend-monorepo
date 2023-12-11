import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { fieldsQueryKey } from "@app/hooks/queries/use-fields-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";

type RemoveFieldMutationResponse = Response<{ id: string }>;

interface UseRemoveFieldMutationParams {
  fieldId?: string;
  onSuccess?: () => void;
}

export const useRemoveFieldMutation = ({ fieldId, onSuccess }: UseRemoveFieldMutationParams) => {
  const warehouseId = useWarehouseId();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      if (!warehouseId || !fieldId) {
        throw new Error("No id");
      }

      const { data } = await api.delete<RemoveFieldMutationResponse>(
        API_ENDPOINTS.core.fields.remove(warehouseId, fieldId),
      );

      return data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Field removed",
          description: "Field removed successfully",
        });

        queryClient.invalidateQueries({
          queryKey: [fieldsQueryKey, warehouseId],
        });

        onSuccess?.();
      },
    },
  );

  return mutation;
};
