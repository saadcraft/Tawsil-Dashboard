"use server"

import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
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

export const refreshAccessToken = async (): Promise<string> => {
        
        const cookiesStore = await cookies();
        const refreshToken = cookiesStore.get("refresh_token")?.value;

        if (!refreshToken) throw new Error("Refresh token is missing");

        try {
                const response = await axios.post<TokenResponse>(
                        `${process.env.SERVER_DOMAIN}/api/token/refresh/`,
                        { refresh: refreshToken },
                        {
                                headers: {
                                        "Content-Type": "application/json",
                                },
                        }
                );

                const { access: newAccessToken, refresh: newRefreshToken } = response.data;

                // Update cookies
                const responseCookies = NextResponse.next();
                responseCookies.cookies.set("access_token", newAccessToken, {
                        path: "/",
                        maxAge: 24 * 60 * 60, // 1 day
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                });
                responseCookies.cookies.set("refresh_token", newRefreshToken, {
                        path: "/",
                        maxAge: 7 * 24 * 60 * 60, // 7 days
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                });

                return newAccessToken;
        } catch (error) {
                console.error("Failed to refresh token:", error);
                throw error;
        }
};