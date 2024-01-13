import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { MeQueryResponse } from "@app/hooks/queries/use-me-query";
import { meQueryKey } from "@app/hooks/queries/use-me-query";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";

type UpdateProfileMutationVariables = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
};

type UpdateProfileMutationResponse = Response<string>;

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = [meQueryKey];
  const { toast } = useToast();

  const mutation = useMutation<
    UpdateProfileMutationResponse,
    unknown,
    UpdateProfileMutationVariables
  >(
    (options) => {
      const formData = new FormData();

      formData.append("email", options.email);
      formData.append("firstName", options.firstName);
      formData.append("lastName", options.lastName);

      if (options.avatar) {
        formData.append("avatar", options.avatar as Blob);
      }

      return api.put(API_ENDPOINTS.user.update, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey });

        const previousUserInfo = queryClient.getQueryData(queryKey);

        await queryClient.invalidateQueries({ queryKey });

        return { previousUserInfo };
      },
      onError: (
        _,
        __,
        context: {
          previousUserInfo: MeQueryResponse;
        },
      ) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while updating your profile.",
        });
        queryClient.setQueryData(queryKey, context.previousUserInfo);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [meQueryKey] });
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Your profile has been updated.",
        });
      },
    },
  );

  return mutation;
};
