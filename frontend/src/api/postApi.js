import api from "./axios";

export const getFeed = async () => {
  const response = await api.get("/feed/");
  return response.data;
};

export const createPost = async (data) => {
  const response = await api.post("/posts/", data);
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};