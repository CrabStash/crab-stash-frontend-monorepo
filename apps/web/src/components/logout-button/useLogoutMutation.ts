import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/router";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/apiEndpoints";
import { URLS } from "@app/constants/urls";

export const useLogoutMutation = () => {
  const { push } = useRouter();
  const mutation = useMutation(
    () =>
      api.get(API_ENDPOINTS.auth.logout, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        push(URLS.login);
      },
    },
  );

  return mutation;
};
