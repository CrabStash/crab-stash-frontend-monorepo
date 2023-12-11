import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";

type Field = {
  id: string;
  title: string;
  type: string;
};

export type FieldByIdQueryResponse = Response<{
  formData: Field;
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
  const warehouseId = useWarehouseId();

  const query = useQuery([fieldByIdQueryKey, warehouseId, params.fieldId], {
    queryFn: () => fieldByIdFetcher(params.fieldId, warehouseId),
    enabled: params.enabled,
  });

  return query;
}
