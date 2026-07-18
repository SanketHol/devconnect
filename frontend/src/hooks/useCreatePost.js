import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPost } from "../api/postApi";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      toast.success("Post created successfully!");

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail || "Failed to create post"
      );
    },
  });
}