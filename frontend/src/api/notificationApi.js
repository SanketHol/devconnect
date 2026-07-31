import api from "./axios";

export const getNotifications = async () => {
  const response = await api.get("/notifications/");
  return response.data;
};


export const getUnreadNotificationCount = async () => {
  const response = await api.get(
    "/notifications/unread-count"
  );

  return response.data;
};


export const markNotificationRead = async (
  notificationId
) => {
  const response = await api.put(
    `/notifications/${notificationId}/read`
  );

  return response.data;
};


export const deleteNotification = async (
  notificationId
) => {
  const response = await api.delete(
    `/notifications/${notificationId}`
  );

  return response.data;
};