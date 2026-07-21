import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../api/postApi";

export function useUserPosts(userId) {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
}