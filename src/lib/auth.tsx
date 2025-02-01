"use server"

import { CookiesRemover } from "./cookies";
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

        if (data.code === 200) {
            const cookiesStore = await cookies();

            cookiesStore.set("access_token", data.data.access_token, {
                path: "/",
                maxAge: 24 * 60 * 60, // 1 day
                secure: process.env.NODE_ENV === "production",
                httpOnly: true, // Prevent client-side access
                sameSite: "strict",
            });

            cookiesStore.set("refresh_token", data.data.refresh_token, {
                path: "/",
                maxAge: 7 * 24 * 60 * 60, // 7 days
                secure: process.env.NODE_ENV === "production",
                httpOnly: true, // Prevent client-side access
                sameSite: "strict",
            });
            return {
                code: data.code,
                data: data.data,
            }
        } else {
            return data.message
        }
    } catch {
        return null
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
        } else {
            return false
        }


    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred during sign-out.");
        }
        throw new Error("Unexpected error during sign-out.");
    }
}

export async function getUser(): Promise<Users | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/user",
        });

        if (response.code == 200) {
            return response.data;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export async function BlockUser({ id }: { id: number }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/account/desactiver",
            data: { id }
        });

        if (response.code == 200) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

export async function sendForget(Data: DataType) {
    try {

        const response = await apiRequest({
            method: "POST",
            url: "api/v1/resetpassword",
            data: Data
        })

        if (response.code == 200) {
            return {
                code: response.code,
                data: response.data
            };
        } else {
            return response.message;
        }

    } catch {
        return false;
    }
}

export async function changePassword({ new_password, token, uid }: { new_password: string, token: string, uid: string }) {
    try {

        const response = await apiRequest({
            method: "POST",
            url: "api/v1/user/chnagepassword",
            data: { new_password, token, uid }
        })

        if (response.code == 200) {
            return {
                code: response.code,
                data: response.data
            }
        } else {
            return response.message
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}


// export async function refreshAccessToken(refreshToken: string): Promise<any> {
//     const response = await fetch(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refreshToken }),
//     })

//     if (!response.ok) {
//         throw new Error('Token refresh failed')
//     }

//     const data = await response.json()

//     console.log('tokens =', data)

//     return {
//         newAccessToken: data.data.access,
//         newRefreshToken: data.data.refresh
//     }
// }