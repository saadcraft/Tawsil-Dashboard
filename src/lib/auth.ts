"use server"


import axios from 'axios';
import { DateTime } from 'next-auth/providers/kakao';
import  { toast } from 'react-hot-toast';
import { cookies } from 'next/headers';

type User = {
    username: string;
    password: string;
}

export type Data = {
    last_name:  string;
    first_name: string;
    username: string;
    date_de_naissance: DateTime;
    lieux: string;
    email: string;
    sex: string;
    phone_number_1: string;
    phone_number_2: string;
    pass: string;
    password: string;
}

export async function SignIn({ username, password } : User) {

    const loadingToastId = toast.loading('Logging in...');

try {


  const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/login`,
        { username, password },
        {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
    if (res.status === 200) {
        toast.success('Login successful', { id: loadingToastId });
        document.cookie = `access_token=${res.data.access_token}; path=/; max-age=${24 * 60 * 60}; secure=${process.env.NODE_ENV === 'production'}; samesite=strict`;
        document.cookie = `refresh_token=${res.data.refresh_token}; path=/; max-age=${7 * 24 * 60 * 60}; secure=${process.env.NODE_ENV === 'production'}; samesite=strict`;
        return res.data ;
    } else {
        toast.error('Login failed' , { id: loadingToastId });
        return null;
    }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Login failed: ${error.response?.data?.message || error.message}` , { id: loadingToastId });
        } else {
            toast.error('An unexpected error occurred' , { id: loadingToastId });
        }
        return null;
    }
}

export async function SignOut({ access, refresh }: { access: string | undefined ; refresh: string | undefined; }){


    const loadingToastId = toast.loading('Logging Out...');

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/logout`,{"refresh_token": refresh},{
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            }
        })
        if(res){
            toast.success('Succesfull Logging Out',  {id: loadingToastId});
            (await cookies()).delete('access_token');
            (await cookies()).delete('refresh_token');
            return res.data
        }
    }catch (error){
      toast.error('Problem in Logging Out', {id: loadingToastId})
      console.log(error)
    }
}

export async function AddAgent(access : string , {last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, pass, password}: Data){
    const loadingToastId = toast.loading('Logging Out...');

    if(pass != password){
        return toast.error("Password and confirm not the same", {id : loadingToastId})
    }

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/users/chef_bureux/agent/create`,{last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, password},{
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            }
        });
        if(res.status === 201){
            toast.success('Agnet added with Succesfully',  {id: loadingToastId})
        }
    }catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Login failed: ${error.response?.data?.message || error.message}` , { id: loadingToastId });
        } else {
            toast.error('An unexpected error occurred' , { id: loadingToastId });
        }
        return null;
    }
}