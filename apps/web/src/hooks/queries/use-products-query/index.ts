import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";
import type { Paginated } from "types/paginated";

export type ProductsQueryResponse = Response<
  Paginated<{
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category_title: string;
    category_id: string;
  }>
>;

export const productsFetcher = async (id: string | null, page = 1, categoryId?: string) => {
  if (!id) {
    throw new Error("No id");
  }

  const { data } = await api.get<ProductsQueryResponse>(
    `${API_ENDPOINTS.core.products.list(id, categoryId)}?page=${page}`,
  );

  return data;
};

export const productsQueryKey = "/products";

interface UseProductsQueryParams {
  page?: number;
  categoryId?: string;
}

export default function useProductsQuery(props?: UseProductsQueryParams) {
  const page = props?.page || 1;
  const warehouseId = useWarehouseId();

  const query = useQuery([productsQueryKey, warehouseId, props?.categoryId, page], {
    queryFn: () => productsFetcher(warehouseId, page),
  });

  console.log(query.data);

  return query;
}
