import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/searchApi";

export function useSearchUsers(query) {
  return useQuery({
    queryKey: ["search-users", query],

    queryFn: () => searchUsers(query),

    enabled: query.length >= 2,
  });
}