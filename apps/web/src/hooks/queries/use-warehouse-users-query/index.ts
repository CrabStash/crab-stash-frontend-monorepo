import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";
import type { Paginated } from "types/paginated";
import type { WarehouseRole } from "types/warehouse-role";

type WarehouseUser = {
  role: WarehouseRole;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    avatar: string;
  };
};

export type WarehouseUsersQueryResponse = Response<Paginated<WarehouseUser>>;

export const warehouseUsersFetcher = async (id: string | null) => {
  if (!id) {
    throw new Error("No id");
  }

  const { data } = await api.get<WarehouseUsersQueryResponse>(API_ENDPOINTS.warehouse.users(id));

  return data;
};

export const warehouseUsersKey = "/warehouse/users/";

interface UseWarehouseUsersQueryParams {
  id: string | null;
}

export default function useWarehouseUsersQuery(params: UseWarehouseUsersQueryParams) {
  const query = useQuery([warehouseUsersKey, params.id], {
    queryFn: () => warehouseUsersFetcher(params.id),
  });

  return query;
}
