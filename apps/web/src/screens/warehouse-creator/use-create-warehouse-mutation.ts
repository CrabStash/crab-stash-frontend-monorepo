import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import type { Response } from "types";

type CreateWarehouseMutation = {
  warehouseID: string;
};

export type CreateWarehouseMutationVariables = {
  name: string;
  desc: string;
  capacity: number;
  logo: File | null;
  isPhysical?: boolean;
};

type CreateWarehouseMutationResponse = Response<CreateWarehouseMutation>;

const fetcher = async (options: CreateWarehouseMutationVariables) => {
  const formData = new FormData();

  formData.append("name", options.name);
  formData.append("desc", options.desc);
  formData.append("capacity", options.capacity.toString());
  formData.append("logo", options.logo as Blob);
  formData.append("isPhysical", options.isPhysical?.toString() ?? "false");

  const { data } = await api.post<CreateWarehouseMutationResponse>(
    API_ENDPOINTS.warehouse.createWarehouse,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export function useCreateWarehouseMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<
    CreateWarehouseMutationResponse,
    unknown,
    CreateWarehouseMutationVariables
  >(fetcher, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([API_ENDPOINTS.warehouse.warehouses]);

      router.push(URLS.warehouseDashboard(data.response.data.warehouseID));
    },
  });

  return mutation;
}
