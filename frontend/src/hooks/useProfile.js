import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profileApi";

export function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });
}