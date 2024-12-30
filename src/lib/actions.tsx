"use server"

import { cookies } from 'next/headers';
import axios from "axios";
import { User , Partner , PartnersResponse } from "./type_module/center_type"

type apiRequest = {
    result : Result[];
    totalAct : number;
}


export async function getCommand({ page , client, valide } : {page : string, client : string, valide : string}): Promise<apiRequest> {

    const access = (await cookies()).get("access_token")?.value

    try{

    const res = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/commandes?page=${page}&livreur=${client}&valide=${valide}`, {
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

export async function getParteners(): Promise<Partner[]> {
    
    const access = (await cookies()).get("access_token")?.value

    try {
        const response = await axios.get(`${process.env.SERVER_DOMAIN}/v1/parteners/`, {
            headers : {
                Authorization: `Bearer ${access}`
            }
        })

        if(response.status === 200){
            // The response data is already in the correct format as Partner[]
            return response.data; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching partners:', error);
        throw error;
    }
}