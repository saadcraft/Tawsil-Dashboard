"use server";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken, CookiesRemover } from "./cookies";
import { cookies } from "next/headers";

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_DOMAIN,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to dynamically retrieve the access token
const getAccessToken = async (): Promise<string | undefined> => {
    const accessToken = (await cookies()).get("access_token")?.value;
    console.log(accessToken,"ccccccccccccccccccc")
    return accessToken;
};

// Axios request interceptor
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401 && error.config) {
            try {
                const newAccessToken = await refreshAccessToken(); // Refresh access token server-side
                if (newAccessToken) {
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api.request(error.config); // Retry original request with new token
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
        }
        throw new Error("Network error occurred");
    }
};

export default api;