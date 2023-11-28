import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { getWarehouseId } from "@app/components/navigation/main-navigation";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";
import type { Paginated } from "types/paginated";

export type FieldsQueryResponse = Response<Paginated<any>>;

export const fieldsFetcher = async (id: string | null, page = 1) => {
  if (!id) {
    throw new Error("No id");
  }

  const { data } = await api.get<FieldsQueryResponse>(
    `${API_ENDPOINTS.core.fields.list(id)}?page=${page}`,
  );

  return data;
};

export const warehousesQueryKey = "/fields";

export default function useFieldsQuery() {
  const router = useRouter();
  const warehouseId = getWarehouseId(router.query);

  const query = useQuery([warehousesQueryKey], {
    queryFn: () => fieldsFetcher(warehouseId),
  });

  return query;
}
