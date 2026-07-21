import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/userApi";

export function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });
}