"use server"

import { cookies } from 'next/headers';
import axios from "axios";
import { CommentaireData } from "./type_module/center_type"
import { User , Partner , PartnersResponse } from "./type_module/center_type"

type Comment = {
    id : number;
    comment : string;
}


export async function AddComment({ id , comment }: Comment){

    const access = (await cookies()).get("access_token")?.value

    try {
        const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/centre_appel/comentaire/add`, { "partener_id" : id ,"commentaire": comment},{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        })

        if(response){
            return true
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        }else{
            throw new Error("Network error");
        }
    }
}

export async function getCommant( id : number): Promise<CommentaireData[]>{
    const access = (await cookies()).get("access_token")?.value

    try{

        const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/centre_appel/Comentaires/partener?id=${id}`,{
            headers: {
                Authorization : `Bearer ${access}`
            }
        })

        if(response.status === 200){
            return response.data.data;
        }else {
        throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        console.error('Error fetching commande:', error);
        throw error;
    }
}

export async function getChefCentre() : Promise<Partner[]>{
    const access = (await cookies()).get("access_token")?.value

    try {
        const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/centreappelgroupe/pertener`, {
            headers : {
                Authorization: `Bearer ${access}`
            }
        })

        if(response.status === 200){
            // The response data is already in the correct format as Partner[]
            return response.data.results;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching partners:', error);
        throw error;
    }
}
