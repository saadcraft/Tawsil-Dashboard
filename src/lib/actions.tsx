"use server"

import { cookies } from 'next/headers';
import axios from "axios";
import { toast } from "react-hot-toast"
import { DateTime } from 'next-auth/providers/kakao';

export type Data = {
    last_name: string;
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

type apiRequest = {
    result : Result[];
    totalAct : number;
}

export async function AddAgent(access: string, Data: Data) {
    const { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, pass, password } = Data
    const loadingToastId = toast.loading('Adding agent...');

    if (pass != password) {
        return toast.error("Password and confirm not the same", { id: loadingToastId })
    }

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/users/chef_bureux/agent/create`, { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, password }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            }
        });
        if (res.status === 201) {
            toast.success('Agnet added with Succesfully', { id: loadingToastId })
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Login failed: ${error.response?.data?.message || error.message}`, { id: loadingToastId });
        } else {
            toast.error('An unexpected error occurred', { id: loadingToastId });
        }
        return null;
    }
}


export async function getCommand({ page } : {page : string}): Promise<apiRequest> {

    const access = (await cookies()).get("access_token")?.value

    try{

    const res = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/commandes?page=${page}`, {
        headers: {
            Authorization : `Bearer ${access}`
        }
    })


    if(res.status === 200){
        const data : ApiResponse = res.data;

        return{
            result : data.results,
            totalAct: data.count
        }
    }else {
        throw new Error(`Unexpected response status: ${res.status}`);
    }

    } catch (error) {
        console.error('Error fetching commande:', error);
        throw error;
    }
}