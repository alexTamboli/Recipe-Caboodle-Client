import axiosInstance from "./axios";

export const likeRecipe = async (id, like, setLike) => {
    setLike(!like);
    const token = JSON.parse(localStorage.getItem("token")).access;
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    if (like) {
        await axiosInstance.delete(`/recipe/${id}/like/`, null);
    } else {
        await axiosInstance.post(`/recipe/${id}/like/`, null);
    }
};