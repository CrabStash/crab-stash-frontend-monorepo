import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import useWarehouseId from "@app/hooks/use-warehouse-id";
import type { Response } from "types";

export type ProductFormData = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  created: string;
};

export type ProductByIdQueryResponse = Response<{
  formData: ProductFormData;
}>;

export const productByIdFetcher = async (
  warehouseId: string | null,
  categoryId: string | null,
  productId: string | null,
) => {
  if (!warehouseId || !categoryId || !productId) {
    throw new Error("No id");
  }

  const { data } = await api.get<ProductByIdQueryResponse>(
    API_ENDPOINTS.core.products.productById(warehouseId, productId, categoryId),
  );

  return data;
};

export const productByIdQueryKey = "/products/id";

interface ProductByIdQueryParams {
  categoryId?: string | null;
  productId?: string | null;
}

export default function useProductByIdQuery(params?: ProductByIdQueryParams) {
  const router = useRouter();
  const warehouseId = useWarehouseId();
  const categoryId = params?.categoryId || (router.query.categoryId as string);
  const productId = params?.productId || (router.query.productId as string);

  const query = useQuery([productByIdQueryKey, warehouseId, categoryId, productId], {
    queryFn: () => productByIdFetcher(warehouseId, categoryId, productId),
  });

  return query;
}
