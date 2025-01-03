// "use server";

// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
// import { cookies } from "next/headers";
// import CookiesRemover from "./cookies";
// import { redirect } from "next/navigation";

// // Create an Axios instance with basic configurations
// const api: AxiosInstance = axios.create({
//     baseURL: process.env.SERVER_DOMAIN,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Function to get the access token from cookies
// const getAccessToken = async (): Promise<string | undefined> => {
//     const accessToken = (await cookies()).get("access_token")?.value;
//     return accessToken;
// };

// // Function to refresh the access token using the refresh token
// const refreshAccessToken = async (): Promise<string> => {
//     const cookiesStore = await cookies();
//     try {
//         const refreshToken = (await cookies()).get("refresh_token")?.value;
//         if (!refreshToken){ 
//             throw new Error("Refresh token not found.");
//         }

//         // Request to refresh the access token
//         const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, {
//             refresh: refreshToken,
//         });

//         const newAccessToken = response.data.access;
//         const newRefreshToken = response.data.refresh;

//         // Update cookies with the new access and refresh tokens
//         cookiesStore.set('access_token', newAccessToken, {
//             path: '/',
//             maxAge: 24 * 60 * 60, // 1 day
//             secure: process.env.NODE_ENV === 'production',
//             httpOnly: true, // Prevent client-side access
//             sameSite: 'strict',
//         });

//         cookiesStore.set('refresh_token', newRefreshToken, {
//             path: '/',
//             maxAge: 7 * 24 * 60 * 60, // 7 days
//             secure: process.env.NODE_ENV === 'production',
//             httpOnly: true, // Prevent client-side access
//             sameSite: 'strict',
//         });

//         return newAccessToken;
//     } catch (error) {
//         throw new Error("Failed to refresh the access token. Please try again.");
//     }
// };

// // Request interceptor to add Authorization header with token
// api.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig) => {
//         const token = await getAccessToken();
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         console.error("Request error:", error);
//         return Promise.reject(error);
//     }
// );

// // Response interceptor to handle expired or invalid tokens (401)
// api.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         if (error.response?.status === 401) {
//             try {
//                 // Attempt to refresh the token
//                 const newAccessToken = await refreshAccessToken();
//                 if (newAccessToken && error.config) {
//                     // Retry the original request with the new token
//                     error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return api.request(error.config);
//                 }
//             } catch (refreshError) {
//                 console.error("Error refreshing token:", refreshError);
//                 CookiesRemover(); // Clear cookies on refresh failure
//                 console.log('saad here look')
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// // General function to make API requests with enhanced error handling
// export const apiRequest = async (config: AxiosRequestConfig) => {
//     try {
//         const response = await api(config);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             const status = error.response?.status;
//             const message = error.response?.data?.message || error.message;

//             // Handle specific HTTP error statuses
//             switch (status) {
//                 case 401:
//                     throw new Error("Unauthorized access. Please log in again.");
//                 case 406:
//                     throw new Error("Incorrect information provided. Please check and try again.");
//                 case 500:
//                     throw new Error("Internal server error. Please try again later.");
//                 default:
//                     throw new Error(`Request failed with status ${status}: ${message}`);
//             }
//         } else {
//             // Handle network errors or other issues that are not Axios-specific
//             throw new Error("Network error or unexpected response. Please check your connection.");
//         }
//     }
// };

// export default api;


"use server"

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import CookiesRemover from "./cookies";

// Create an Axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to dynamically get the access token
const getAccessToken = async () => {
    const accessToken = (await cookies()).get("access_token")?.value;
    return accessToken;
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string> => {
    const cookiesStore = await cookies();
    try {
        const refreshToken = (await cookies()).get("refresh_token")?.value;
        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, {
            refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;
        // Update cookies or other storage with the new access token
        // For example, if you're using cookies:
        cookiesStore.set('access_token', newAccessToken, {
            path: '/',
            maxAge: 24 * 60 * 60, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, // Prevent client-side access
            sameSite: 'strict',
        });
        cookiesStore.set('refresh_token', newRefreshToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 1 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, // Prevent client-side access
            sameSite: 'strict',
        });
        return newAccessToken;
    } catch (error) {
        throw new Error("Failed to refresh access token");
    }
};

// Request interceptor to add the Authorization header
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getAccessToken();
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken && error.config) {
                    // Retry the original request with the new token
                    error.config.headers.set('Authorization', `Bearer ${newAccessToken}`);
                    return api.request(error.config);
                }
            } catch (refreshError) {
                CookiesRemover();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const apiRequest = async (config: AxiosRequestConfig) => {
    try {
        const response = await api(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("Network error");
        }
    }
};

export default api;