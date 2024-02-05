import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';

export const baseURL = "https://recipe-caboodle-backend-server.onrender.com/api";

let token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${token?.access}` }
});

let isRefreshing = false;
let refreshPromise = null;

axiosInstance.interceptors.request.use(
    // my implementationyy
    // async req => {
    //     if (!token) {
    //         token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    //         req.headers.Authorization = `Bearer ${token?.access}`;
    //         axiosInstance.defaults.headers['Authorization'] = `Bearer ${token?.access}`;
    //     }
    //     console.log(req);
    //     let decodedToken = jwtDecode(token.access);
    //     let isExpired = dayjs().isAfter(dayjs.unix(decodedToken.exp).subtract(10, 'seconds'));
    //     if (!isExpired) return req;
    //     if (dayjs().isAfter(dayjs.unix(jwtDecode(token.refresh).exp))) {
    //         localStorage.removeItem("token");
    //         window.location.href = "/login";
    //     }
    //     localStorage.removeItem("token");
    //     const response = await axios.post(`${baseURL}/user/token/refresh/`, { refresh: token.refresh });
    //     token = await response.data;
    //     localStorage.setItem("token", JSON.stringify(token));
    //     req.headers.Authorization = `Bearer ${token.access}`;
    //     axiosInstance.defaults.headers['Authorization'] = `Bearer ${token?.access}`;
    //     return req;
    // }

    // promice implementation
    async (req) => {
        if (!token) {
            token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
            req.headers.Authorization = `Bearer ${token?.access}`;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token?.access}`;
        }

        let decodedToken = jwtDecode(token.access);
        let isExpired = dayjs().isAfter(dayjs.unix(decodedToken.exp));

        if (!isExpired) {
            return req;
        }

        if (dayjs().isAfter(dayjs.unix(jwtDecode(token.refresh).exp))) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        if (!isRefreshing) {
            isRefreshing = true;

            refreshPromise = new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.post(`${baseURL}/user/token/refresh/`, { refresh: token.refresh });
                    token = response.data;
                    localStorage.setItem("token", JSON.stringify(token));

                    req.headers.Authorization = `Bearer ${token.access}`;
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token?.access}`;

                    resolve(req);
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return refreshPromise;
    },
    (error) => {
        // Handle other request errors here
        return Promise.reject(error);
    }
);

export default axiosInstance;
