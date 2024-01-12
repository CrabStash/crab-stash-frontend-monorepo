import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@app/api";
import { API_ENDPOINTS } from "@app/constants/api-endpoints";
import type { MeQueryResponse } from "@app/hooks/queries/use-me-query";
import useMeQuery, { meQueryKey } from "@app/hooks/queries/use-me-query";
import { useToast } from "@crab-stash/ui";
import type { Response } from "types";

type UpdateProfileMutationVariables = {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

type UpdateProfileMutationResponse = Response<string>;

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { data } = useMeQuery();
  const queryKey = [meQueryKey];
  const { toast } = useToast();

  const mutation = useMutation<
    UpdateProfileMutationResponse,
    unknown,
    UpdateProfileMutationVariables
  >(
    (options) => {
      return api.put(API_ENDPOINTS.user.update, {
        data: {
          ...options.data,
          default_warehouse: data?.response.data.default_warehouse,
        },
      });
    },
    {
      onMutate: async ({ data: userInfo }) => {
        await queryClient.cancelQueries({ queryKey });

        const previousUserInfo = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old: MeQueryResponse) => {
          return {
            ...old,
            response: {
              data: {
                ...old.response.data,
                ...userInfo,
              },
            },
          };
        });

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
