import api from "./axios";

export const getComments = async (postId) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
};

export const createComment = async ({ postId, text }) => {
    const response = await api.post("/comments/", {
        post_id: postId,
        text,
    });

    return response.data;
};