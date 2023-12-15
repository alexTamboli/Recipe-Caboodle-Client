import axios from "axios";

const baseURL = "https://recipe-caboodle-backend-server.onrender.com/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            originalRequest.url ===
            "https://recipe-caboodle-backend-server.onrender.com/api/user/token/refresh/"
        ) {
            window.location.href = "/user/login/";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            const refresh = JSON.parse(localStorage.getItem("token")).refresh;

            return axiosInstance
                .post("/user/token/refresh/", {
                    refresh
                })
                .then((response) => {
                    localStorage.setItem("token", JSON.stringify(response.data));

                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("token")).access
                        }`;

                    originalRequest.headers["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("token")).access
                        }`;

                    return axiosInstance(originalRequest);
                });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;