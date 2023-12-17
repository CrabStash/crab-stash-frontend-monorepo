import type { ParsedUrlQuery } from "querystring";

export const getWarehouseId = (query: ParsedUrlQuery) => {
  const warehouseId = query.warehouseId;

  if (warehouseId && typeof warehouseId === "string") {
    return decodeURIComponent(warehouseId);
  }

  return null;
};

export const getProductId = (query: ParsedUrlQuery) => {
  const productId = query.productId;

  if (productId && typeof productId === "string") {
    return decodeURIComponent(productId);
  }

  return null;
};

export const getCategoryId = (query: ParsedUrlQuery) => {
  const categoryId = query.categoryId;

  if (categoryId && typeof categoryId === "string") {
    return decodeURIComponent(categoryId);
  }

  return null;
};
