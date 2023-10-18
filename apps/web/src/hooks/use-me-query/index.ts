import { useQuery } from "@tanstack/react-query";

import type { GetServerSidePropsContext } from "next";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { COOKIES_AUTH_TOKEN_KEY } from "@app/constants/tokens";
import nookies from "nookies";
import type { Response, User } from "types";

export type MeQueryResponse = Response<User>;

export const meFetcher = async (context?: GetServerSidePropsContext) => {
  const cookies = nookies.get(context || null);

  if (!cookies[COOKIES_AUTH_TOKEN_KEY]) {
    return undefined;
  }

  const { data } = await api.get<MeQueryResponse>(API_ENDPOINTS.user.me);

  return data;
};

export const meQueryKey = API_ENDPOINTS.user.me;

export default function useMeQuery() {
  const query = useQuery([meQueryKey], {
    queryFn: () => meFetcher(),
  });

  return query;
}
