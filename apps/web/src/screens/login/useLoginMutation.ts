import { useMutation } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/apiEndpoints";
import type { Response } from "types";

type LoginMutation = {
  token: string;
};

type LoginMutationVariables = {
  email: string;
  passwd: string;
};

type LoginMutationResponse = Response<LoginMutation>;

const fetcher = async (options: LoginMutationVariables) => {
  const { data } = await api.post<LoginMutationResponse>(API_ENDPOINTS.auth.login, options);

  return data;
};

export function useLoginMutation() {
  const mutation = useMutation<LoginMutationResponse, unknown, LoginMutationVariables>(fetcher);

  return mutation;
}
