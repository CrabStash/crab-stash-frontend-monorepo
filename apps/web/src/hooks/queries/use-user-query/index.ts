import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { Response, User } from "types";

export type UserQueryResponse = Response<Omit<User, "id">>;

export const userFetcher = async (userId: string) => {
  const { data } = await api.get<UserQueryResponse>(API_ENDPOINTS.user.info(userId));

  return data;
};

export const userQueryKey = "/user";

export default function useUserQuery() {
  const router = useRouter();
  const userId = router.query.userId as string;
  const query = useQuery([userQueryKey, userId], {
    queryFn: () => userFetcher(userId),
  });

  return query;
}
