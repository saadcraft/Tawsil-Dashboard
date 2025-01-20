"use server"

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Function to dynamically get the access token
const getAccessToken = async (): Promise<string | undefined> => {
    const accessToken = (await cookies()).get("access_token")?.value;
    return accessToken;
};

// Create an Axios instance
const api: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


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
            // try {
            //     const newAccessToken = await refreshAccessToken();
            //     if (newAccessToken && error.config) {
            //         // Retry the original request with the new token
            //         error.config.headers.set('Authorization', `Bearer ${newAccessToken}`);
            //         return api.request(error.config);
            //     }
            // } catch (refreshError) {
            //     CookiesRemover();
            //     return Promise.reject(refreshError);
            // }
            // revalidatePath('/')
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