"use server"

import { cookies } from 'next/headers';
import axios from "axios";
import { Partner } from "./type_module/center_type"
import { apiRequest } from "./request";

type apiRequest = {
    result: Result[];
    totalAct: number;
}


// export async function getCommand({ page, client, valide }: { page: string, client: string, valide: string }): Promise<apiRequest> {

//     const access = (await cookies()).get("access_token")?.value

//     try {

//         const res = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/commandes?page=${page}&livreur=${client}&valide=${valide}`, {
//             headers: {
//                 Authorization: `Bearer ${access}`
//             }
//         })


//         if (res.status === 200) {
//             const data: ApiResponse = res.data;

//             return {
//                 result: data.results,
//                 totalAct: data.count
//             }
//         } else {
//             throw new Error(`Unexpected response status: ${res.status}`);
//         }

//     } catch (error) {
//         console.error('Error fetching commande:', error);
//         throw error;
//     }
// }

export async function getCommand({ page, livreur, valide }: { page: string, livreur: string, valide: string }): Promise<apiRequest> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chefbureux/commandes",
            params: { page, livreur, valide }
        });
        return {
            result: response.results,
            totalAct: response.count
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function getParteners(): Promise<Partner[]> {

//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/centreappel/parteners`, {
//             headers : {
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if(response.status === 200){
//             // The response data is already in the correct format as Partner[]
//             return response.data.results;
//         } else {
//             throw new Error(`Unexpected response status: ${response.status}`);
//         }
//     } catch (error) {
//         console.error('Error fetching partners:', error);
//         throw error;
//     }
// }

export async function getParteners(): Promise<Partner[]> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/centreappel/parteners",
        });
        return response.results;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}