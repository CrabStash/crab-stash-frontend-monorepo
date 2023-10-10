import { useQuery } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";

export const meFetcher = async () => {
  const { data } = await api.get(API_ENDPOINTS.user.me);

  return data;
};

export const meQueryKey = API_ENDPOINTS.user.me;

export default function useMeQuery() {
  const query = useQuery([meQueryKey], {
    queryFn: meFetcher,
  });

  return query;
}
