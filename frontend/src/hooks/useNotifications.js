import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationRead,
  deleteNotification,
} from "../api/notificationApi";


export function useNotifications() {

  const queryClient = useQueryClient();


  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 10000,
  });


  const unreadQuery = useQuery({
    queryKey: ["notifications-unread"],
    queryFn: getUnreadNotificationCount,
    refetchInterval: 10000,
  });


  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications-unread"],
      });
    },
  });


  const deleteMutation = useMutation({
    mutationFn: deleteNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications-unread"],
      });
    },
  });


  return {
    notifications: notificationsQuery.data ?? [],
    isLoading: notificationsQuery.isLoading,

    unreadCount:
      unreadQuery.data?.count ?? 0,

    markReadMutation,
    deleteMutation,
  };
}