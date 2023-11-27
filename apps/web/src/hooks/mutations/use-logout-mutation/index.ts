import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { URLS } from "@app/constants/urls";
import { destroyAuthTokens } from "@app/utils/tokens";
import { useToast } from "@crab-stash/ui";

export const useLogoutMutation = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation(
    () =>
      api.get(API_ENDPOINTS.auth.logout, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.user.me] });

        destroyAuthTokens(null);

        toast({
          title: "Logged out",
          description: "You have been logged out",
        });
        push(URLS.login);
      },
    },
  );

  return mutation;
};
