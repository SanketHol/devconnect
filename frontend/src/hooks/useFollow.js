import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  followUser,
  unfollowUser,
} from "../api/followApi";

export function useFollow() {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: followUser,

    onSuccess: (_, userId) => {
      queryClient.setQueriesData(
        { queryKey: ["profile"] },
        (oldData) => {
          if (!oldData || oldData.id !== userId) return oldData;

          return {
            ...oldData,
            is_following: true,
            followers_count:
              oldData.followers_count + 1,
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,

    onSuccess: (_, userId) => {
      queryClient.setQueriesData(
        { queryKey: ["profile"] },
        (oldData) => {
          if (!oldData || oldData.id !== userId) return oldData;

          return {
            ...oldData,
            is_following: false,
            followers_count:
              Math.max(0, oldData.followers_count - 1),
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });

  return {
    followMutation,
    unfollowMutation,
  };
}