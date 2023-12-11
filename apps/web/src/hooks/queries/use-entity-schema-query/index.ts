import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import type { Response } from "types";

export type ProductSchemaQuery = Response<{
  schema: RJSFSchema;
  uiSchema: UiSchema;
}>;

export const productSchemaFetcher = async (warehouseId: string | null, categoryId?: string) => {
  if (!warehouseId || !categoryId) {
    throw new Error("No id");
  }

  const { data } = await api.get<ProductSchemaQuery>(
    API_ENDPOINTS.schema.product(warehouseId, categoryId),
  );

  return data;
};

export const productSchemaQueryKey = API_ENDPOINTS.schema.product;

interface UseProductSchemaQueryParams {
  categoryId?: string;
}

export default function useProductSchemaQuery(params?: UseProductSchemaQueryParams) {
  const warehouseId = useWarehouseId();

  const query = useQuery([productSchemaQueryKey, warehouseId, params?.categoryId], {
    queryFn: () => productSchemaFetcher(warehouseId, params?.categoryId),
  });

  return query;
}
