import api from "./axios";

export const followUser = async (userId) => {
  const res = await api.post(`/follows/${userId}`);
  return res.data;
};

export const unfollowUser = async (userId) => {
  const res = await api.delete(`/follows/${userId}`);
  return res.data;
};

export const getFollowers = async (userId) => {
  const res = await api.get(`/follows/followers/${userId}`);
  return res.data;
};

export const getFollowing = async (userId) => {
  const res = await api.get(`/follows/following/${userId}`);
  return res.data;
};