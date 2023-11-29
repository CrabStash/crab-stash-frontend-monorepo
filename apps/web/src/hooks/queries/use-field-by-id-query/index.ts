import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";

export type FieldByIdQueryResponse = Response<{
  formData: Record<string, unknown>;
}>;

export const fieldByIdFetcher = async (fieldId: string, warehouseId: string | null) => {
  if (!warehouseId) {
    throw new Error("No id");
  }

  const { data } = await api.get<FieldByIdQueryResponse>(
    API_ENDPOINTS.core.fields.fieldById(warehouseId, fieldId),
  );

  return data;
};

export const fieldByIdQueryKey = "/field";

interface UseFieldsQueryParams {
  fieldId: string;
  enabled?: boolean;
}

export default function useFieldByIdQuery(params: UseFieldsQueryParams) {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);

  const query = useQuery([fieldByIdQueryKey, warehouseId, params.fieldId], {
    queryFn: () => fieldByIdFetcher(params.fieldId, warehouseId),
    enabled: params.enabled,
  });

  return query;
}
