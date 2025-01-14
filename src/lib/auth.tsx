"use server"

import CookiesRemover from "./cookies";
import { cookies } from 'next/headers';
import { apiRequest } from "./request";


type User = {
    username: string;
    password: string;
}

type DataType = {
    [key: string | number]: unknown
}

export async function SignIn({ username, password }: User) {
    try {
        const data = await apiRequest({
            method: "POST",
            url: "/api/v1/login",
            data: { username, password },
            withCredentials: true,
        });
        // const data = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/login`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     credentials: "include",
        //     body: JSON.stringify({ username, password })
        // })

        const cookiesStore = await cookies();

        cookiesStore.set("access_token", data.access_token, {
            path: "/",
            maxAge: 24 * 60 * 60, // 1 day
            secure: process.env.NODE_ENV === "production",
            httpOnly: true, // Prevent client-side access
            sameSite: "strict",
        });

        cookiesStore.set("refresh_token", data.refresh_token, {
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            secure: process.env.NODE_ENV === "production",
            httpOnly: true, // Prevent client-side access
            sameSite: "strict",
        });
        if (data) {
            return data
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during sign-in");
        }
        throw new Error("Unexpected error during sign-in");
    }
}

export async function SignOut() {
    const refresh = (await cookies()).get("refresh_token")?.value
    try {
        const res = await apiRequest({
            method: "POST",
            url: "/api/v1/logout",
            data: { "refresh_token": refresh },
        });
        if (res) {
            CookiesRemover();
            return true
        }

        throw new Error("Failed to log out.");
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during sign-out.");
        }
        throw new Error("Unexpected error during sign-out.");
    }
}

export async function getUser(): Promise<Users> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/user",
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function BlockUser({ id }: { id: number }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/account/desactiver",
            data: { id }
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function sendForget(Data: DataType) {
    try {

        const response = await apiRequest({
            method: "POST",
            url: "api/v1/resetpassword",
            data: Data
        })

        if (response) {
            return true
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function changePassword({ new_password, token, uid }: { new_password: string, token: string, uid: string }) {
    try {

        const response = await apiRequest({
            method: "POST",
            url: "api/v1/user/chnagepassword",
            data: { new_password, token, uid }
        })

        if (response) {
            return true
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}