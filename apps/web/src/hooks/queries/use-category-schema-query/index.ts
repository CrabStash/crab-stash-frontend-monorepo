import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import type { Response } from "types";

export type CategorySchemaQuery = Response<{
  schema: RJSFSchema;
  uiSchema: UiSchema;
}>;

export const categorySchemaFetcher = async () => {
  const { data } = await api.get<CategorySchemaQuery>(API_ENDPOINTS.schema.category);

  return data;
};

export const categorySchemaQueryKey = API_ENDPOINTS.schema.category;

export default function useCategorySchemaQuery() {
  const query = useQuery([categorySchemaQueryKey], {
    queryFn: () => categorySchemaFetcher(),
  });

  return query;
}
