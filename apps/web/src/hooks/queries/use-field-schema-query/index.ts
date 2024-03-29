import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import type { Response } from "types";

export type FieldSchemaQuery = Response<{
  schema: RJSFSchema;
  uiSchema: UiSchema;
}>;

export const fieldSchemaFetcher = async () => {
  const { data } = await api.get<FieldSchemaQuery>(API_ENDPOINTS.schema.field);

  return data;
};

export const fieldSchemaQueryKey = API_ENDPOINTS.schema.field;

export default function useFieldSchemaQuery() {
  const query = useQuery([fieldSchemaQueryKey], {
    queryFn: () => fieldSchemaFetcher(),
  });

  return query;
}
