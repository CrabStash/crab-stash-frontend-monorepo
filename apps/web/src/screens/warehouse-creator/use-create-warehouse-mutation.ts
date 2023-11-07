import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";

type CreateWarehouseMutation = {
  token: string;
};

type CreateWarehouseMutationVariables = {
  name: string;
  desc: string;
  capacity: number;
  logo: string;
  isPhysical?: boolean;
};

type CreateWarehouseMutationResponse = Response<CreateWarehouseMutation>;

const fetcher = async (options: CreateWarehouseMutationVariables) => {
  const { data } = await api.post<CreateWarehouseMutationResponse>(
    API_ENDPOINTS.warehouse.createWarehouse,
    options,
  );

  return data;
};

export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    CreateWarehouseMutationResponse,
    unknown,
    CreateWarehouseMutationVariables
  >(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.warehouse.warehouses]);
    },
  });

  return mutation;
}
