import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/commentApi";
import toast from "react-hot-toast";

export function useCreateComment(postId) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createComment,

        onSuccess: () => {

            toast.success("Comment added");

            queryClient.invalidateQueries({
                queryKey: ["comments", postId],
            });

            queryClient.invalidateQueries({
                queryKey: ["feed"],
            });

        },

        onError: () => {

            toast.error("Failed to add comment");

        },

    });

}