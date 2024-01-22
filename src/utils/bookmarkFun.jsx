import axiosInstance from "./axios";

export const bookmarkRecipe = async (id, bookmark, setBookmark) => {
    setBookmark(!bookmark);
    const token = JSON.parse(localStorage.getItem("token")).access;
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    if (bookmark) {
        console.log(id);
        await axiosInstance.delete(`/user/profile/bookmarks/${id}`, null);
    } else {
        await axiosInstance.post(`/user/profile/bookmarks/`, { id: id });
    }
    console.log("Bm request sent successfully!");
};