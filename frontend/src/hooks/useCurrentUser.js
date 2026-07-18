import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/userApi";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
}