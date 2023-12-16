import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";
import type { Paginated } from "types/paginated";

export type FieldsQueryResponse = Response<
  Paginated<{
    id: string;
    title: string;
    type: string;
  }>
>;

export const fieldsFetcher = async (id: string | null, page = 1, parentCategory?: string) => {
  if (!id) {
    throw new Error("No id");
  }

  const { data } = await api.get<FieldsQueryResponse>(
    `${API_ENDPOINTS.core.fields.list(id)}?page=${page}${
      parentCategory ? `&parentCategory=${parentCategory}` : ""
    }`,
  );

  return data;
};

export const fieldsQueryKey = "/fields";

interface UseFieldsQueryParams {
  page?: number;
}

export default function useFieldsQuery(props?: UseFieldsQueryParams) {
  const page = props?.page || 1;
  const warehouseId = useWarehouseId();

  const query = useQuery([fieldsQueryKey, warehouseId, page], {
    queryFn: () => fieldsFetcher(warehouseId, page),
  });

  return query;
}
