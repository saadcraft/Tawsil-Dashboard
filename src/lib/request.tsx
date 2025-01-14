"use server"

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";


import { cookies } from "next/headers";
import { CookiesRemover } from "./cookies";

type TokenResponse = {
    access: string;
    refresh: string;
}
// Create an Axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to dynamically get the access token
const getAccessToken = async (): Promise<string | undefined> => {
    const accessToken = (await cookies()).get("access_token")?.value;
    return accessToken;
};

// Function to refresh the access token
export const refreshAccessToken = async (): Promise<string> => {
    "use server"
    const cookiesStore = await cookies();
    try {
        const refreshToken = (await cookies()).get("refresh_token")?.value;

        console.log(refreshToken, "ana houwa ana")

        if (!refreshToken) throw new Error("No refresh token found");

        const response = await axios.post<TokenResponse>(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, { refresh: refreshToken }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const newAccessToken = response.data.access
        const newRefreshToken = response.data.refresh
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
            maxAge: 7 * 24 * 60 * 60, // 7 day
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true, // Prevent client-side access
            sameSite: 'strict',
        });
        return newAccessToken;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error refreshing access token:", error.response?.data || error.message);
        } else {
            console.error("Error refreshing access token:", error);
        }
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