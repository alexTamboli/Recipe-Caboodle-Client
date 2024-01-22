import axios from 'axios';

const baseURL = "https://recipe-caboodle-backend-server.onrender.com/api";

// Function to refresh the access token using the refresh token
const refreshAccessToken = async () => {
    const refresh = JSON.parse(localStorage.getItem("token")).refresh;
    try {
        // Send a request to refresh the access token using the refresh token
        const response = await axiosInstance.post('/user/token/refresh/', {
            refresh, // Replace with your actual refresh token
        });

        // If the refresh is successful, return the new access token
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        // Handle errors during token refresh (e.g., refresh token expired)
        throw new Error(error);
    }
};

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

// Axios request interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response, // If the response is successful, just return it
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 Unauthorized error
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Attempt to refresh the access token
                const newToken = await refreshAccessToken();

                localStorage.setItem("token", JSON.stringify(newToken));
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken.access}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken.access}`;
                // If the refresh is successful, update the original request with the new access token

                // Retry the original request with the new access token using the modified Axios instance
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                if (refreshError.detail === "Token is invalid or expired") {
                    // Redirect to the login page if the refresh token is also expired
                    console.error('Both access and refresh tokens are expired. Redirecting to login.');

                    // Handle the redirection appropriately, for example:
                    window.location.href = '/login';

                    // Ensure to return a rejected Promise so that the catch block is executed
                    return Promise.reject(refreshError);
                } else {
                    // Handle other refresh errors
                    console.error('Token refresh failed:', refreshError);
                }
            }
        }

        // If the error is not a 401 or token refresh fails, just return the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
