import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { destroyAuthTokens } from "@app/utils/tokens";

export const useLogoutMutation = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      api.get(API_ENDPOINTS.auth.logout, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.user.me] });

        destroyAuthTokens(null);

        push(URLS.login);
      },
    },
  );

  return mutation;
};
