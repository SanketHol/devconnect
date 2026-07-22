import api from "./axios";

export const searchUsers = async (query) => {
  const res = await api.get("/users/search", {
    params: {
      query,
    },
  });

  return res.data;
};