import api from "./axios";

export const toggleLike = async (postId) => {

    const response = await api.post("/likes/", {
        post_id: postId,
    });

    return response.data;

};