import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../api/postApi";

export function usePosts() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });
}