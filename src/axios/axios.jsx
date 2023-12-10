import axios from "axios";

const baseURL = "https://recipe-caboodle-backend-server.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;