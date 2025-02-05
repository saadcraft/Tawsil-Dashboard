"use server"

import { cookies } from 'next/headers';
import axios from "axios";

// Function to remove cookies and redirect user to login page
export async function CookiesRemover() {
        const cookieStore = await cookies();

        // if(cookieStore.get("access_token") && cookieStore.get("refresh_token")){
        // Delete access_token and refresh_token cookies from root path
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');

        // }
}

type TokenResponse = {
        access: string;
        refresh: string;
};

export const refreshAccessToken = async (): Promise<TokenResponse | undefined> => {

        const cookiesStore = await cookies();
        const refreshToken = cookiesStore.get("refresh_token")?.value;

        if (!refreshToken) throw new Error("Refresh token is missing");

        try {
                const response = await fetch(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({ 'refresh': refreshToken }),
                        headers: {
                                'Content-Type': 'application/json',
                        }
                });
                // if (response.status == 401) {
                //         console.log('here we go')
                //         CookiesRemover();
                // }

                if (response.ok) {

                        const { access: newAccessToken, refresh: newRefreshToken } = await response.json();

                        // Update cookies
                        // cookiesStore.set("access_token", newAccessToken, {
                        //         path: "/",
                        //         maxAge: 24 * 60 * 60, // 1 day
                        //         httpOnly: true,
                        //         secure: process.env.NODE_ENV === "production",
                        //         sameSite: "strict",
                        // });
                        // cookiesStore.set("refresh_token", newRefreshToken, {
                        //         path: "/",
                        //         maxAge: 7 * 24 * 60 * 60, // 7 days
                        //         httpOnly: true,
                        //         secure: process.env.NODE_ENV === "production",
                        //         sameSite: "strict",
                        // });
                        return {
                                access: newAccessToken,
                                refresh: newRefreshToken
                        };
                }
        } catch (error) {
                if (axios.isAxiosError(error)) {
                        console.error("Error refreshing access token:", error.response?.data || error.message);
                } else {
                        console.error("Error refreshing access token:", error);
                }
                throw new Error("Failed to refresh access token");
        }
};