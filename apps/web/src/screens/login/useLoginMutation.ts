import { useMutation } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/apiEndpoints";

type LoginMutation = {
  token: string;
  refresh: string;
};

type LoginMutationVariables = {
  email: string;
  passwd: string;
};

export function useLoginMutation() {
  const mutation = useMutation<LoginMutation, unknown, LoginMutationVariables>((data) =>
    api.post(API_ENDPOINTS.auth.login, data),
  );

  return mutation;
}
