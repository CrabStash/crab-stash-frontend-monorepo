import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { productsQueryKey } from "@app/hooks/queries/use-products-query";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";

type RemoveProductMutationResponse = Response<{ id: string }>;

interface UseRemoveProductMutationParams {
  productId?: string;
  categoryId?: string;
  onSuccess?: () => void;
}

export const useRemoveProductMutation = ({
  productId,
  categoryId,
  onSuccess,
}: UseRemoveProductMutationParams) => {
  const warehouseId = useWarehouseId();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      if (!warehouseId || !productId || !categoryId) {
        throw new Error("No id");
      }

      const { data } = await api.delete<RemoveProductMutationResponse>(
        API_ENDPOINTS.core.products.remove(warehouseId, productId, categoryId),
      );

      return data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Product removed",
          description: "Product removed successfully",
        });

        queryClient.invalidateQueries({
          queryKey: [productsQueryKey, warehouseId],
        });

        onSuccess?.();
      },
    },
  );

  return mutation;
};
