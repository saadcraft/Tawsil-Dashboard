"use server"

import axios from 'axios';
import { toast } from 'react-hot-toast';
import CookiesRemover from "./cookies";
import { cookies } from 'next/headers';


type User = {
    username: string;
    password: string;
}

export async function SignIn({ username, password }: User) {

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/login`,
            { username, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

        if (res.status === 200) {
            const cookiesStore = await cookies();

            cookiesStore.set('access_token', res.data.access_token, {
                path: '/',
                maxAge: 24 * 60 * 60, // 1 day
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true, // Prevent client-side access
                sameSite: 'strict',
            });

            cookiesStore.set('refresh_token', res.data.refresh_token, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: 'strict',
            });

            return res.data;

        } else {
            return null;
        }
    } catch (error) {
        console.error('Axios Error:', error);
        if (axios.isAxiosError(error) && error.status === 401) {
            throw new Error("some information is incorrect")
        }else if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error('Unexpected response from the server');
        }
    }
}

export async function SignOut() {

    const access = (await cookies()).get("access_token")?.value
    const refresh = (await cookies()).get("refresh_token")?.value

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/logout`, { "refresh_token": refresh }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            }
        })
        if (res) {
            CookiesRemover();
            return true
        }
    } catch (error) {
        throw error
    }
}