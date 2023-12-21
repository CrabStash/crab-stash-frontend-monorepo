import { useMutation } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";

type ChangePasswordMutationVariables = {
  oldPassword: string;
  newPassword: string;
};

type ChangePasswordMutationResponse = Response<string>;

export const useChangePasswordMutation = () => {
  const { toast } = useToast();

  const mutation = useMutation<
    ChangePasswordMutationResponse,
    unknown,
    ChangePasswordMutationVariables
  >(
    (options) => {
      return api.post(API_ENDPOINTS.user.changePassword, options);
    },
    {
      onSuccess: () => {
        toast({
          title: "Password changed successfully",
          description: "Your password has been changed successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong while changing your password",
          variant: "destructive",
        });
      },
    },
  );

  return mutation;
};
