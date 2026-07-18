import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../api/likeApi";

export function useLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLike,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ["feed"],
      });

      const previousFeed = queryClient.getQueryData(["feed"]);

      queryClient.setQueryData(["feed"], (oldFeed) => {
        if (!oldFeed) return oldFeed;

        return oldFeed.map((post) => {
          if (post.id !== postId) return post;

          return {
            ...post,
            is_liked: !post.is_liked,
            likes_count: post.is_liked
              ? post.likes_count - 1
              : post.likes_count + 1,
          };
        });
      });

      return { previousFeed };
    },

    onError: (err, postId, context) => {
      queryClient.setQueryData(
        ["feed"],
        context.previousFeed
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },
  });
}