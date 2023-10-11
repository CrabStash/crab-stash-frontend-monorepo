import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response } from "types";

export type MeQueryResponse = Response<{
  firstName: string;
  lastName: string;
  email: string;
}>;

export const meFetcher = async () => {
  const { data } = await api.get<MeQueryResponse>(API_ENDPOINTS.user.me);

  return {
    response: {
      data: {
        // @ts-ignore TODO
        firstName: data.Response.Data.firstName,
        // @ts-ignore TODO
        lastName: data.Response.Data.lastName,
        // @ts-ignore TODO
        email: data.Response.Data.email,
      },
    },
    status: data.status,
  };
};

export const meQueryKey = API_ENDPOINTS.user.me;

export default function useMeQuery() {
  const query = useQuery([meQueryKey], {
    queryFn: meFetcher,
  });

  return query;
}
