import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postApi";
import toast from "react-hot-toast";

export function useCreatePost() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createPost,

    onSuccess: () => {

      toast.success("Post created!");

      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

    },

  });

}