import api from "./axios";

export const getProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/users/me", data);
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};