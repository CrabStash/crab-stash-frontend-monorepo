import { useMutation } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";

type RegisterMutation = {
  token: string;
};

type RegisterMutationVariables = {
  email: string;
  passwd: string;
  firstName: string;
  lastName: string;
};

export function useRegisterMutation() {
  const mutation = useMutation<RegisterMutation, unknown, RegisterMutationVariables>((data) =>
    api.post(API_ENDPOINTS.auth.register, data),
  );

  return mutation;
}
