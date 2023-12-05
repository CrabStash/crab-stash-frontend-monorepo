import type { ParsedUrlQuery } from "querystring";

export const getCategoryId = (query: ParsedUrlQuery) => {
  const categoryId = query.categoryId;

  if (categoryId && typeof categoryId === "string") {
    return decodeURIComponent(categoryId);
  }

  return null;
};
