import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api/likeApi";

export function useLike() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: toggleLike,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["feed"],
            });

        },

    });

}