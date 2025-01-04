"use server"

import { cookies } from 'next/headers';
import axios from "axios";
import { CommentaireData } from "./type_module/center_type"
import { Partner } from "./type_module/center_type"
import { EmployersResponse, Employer } from "./type_module/emploi_type"
import { apiRequest } from "./request";

type Comment = {
    id: number;
    comment: string;
}

type apiRequest = {
    result: Employer[];
    totalAct: number;
}


// export async function AddComment({ id, comment }: Comment) {

//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/centre_appel/comentaire/add`, { "partener_id": id, "commentaire": comment }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if (response) {
//             return true
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || error.message);
//         } else {
//             throw new Error("Network error");
//         }
//     }
// }

export async function AddComment({ id, comment }: Comment) {
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/comentaire/add`,
            method: "post",
            data : { "partener_id": id, "commentaire": comment }
        });
        return true;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function getCommant( id : number): Promise<CommentaireData[]>{
//     const access = (await cookies()).get("access_token")?.value

//     try{

//         const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/centre_appel/Comentaires/partener?id=${id}`,{
//             headers: {
//                 Authorization : `Bearer ${access}`
//             }
//         })

//         if(response.status === 200){
//             return response.data.data;
//         }else {
//         throw new Error(`Unexpected response status: ${response.status}`);
//         }

//     } catch (error) {
//         console.error('Error fetching commande:', error);
//         throw error;
//     }
// }

export const getCommant = async (id: number): Promise<CommentaireData[]> => {
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/Comentaires/partener`,
            method: "GET",
            params: { id },
        });
        return data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
};

// export async function getChefCentre() : Promise<Partner[]>{
//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/centreappelgroupe/pertener`, {
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

export async function getChefCentre(): Promise<Partner[]> {
    try {
        const data = await apiRequest({
            url: `/api/v1/centreappelgroupe/pertener`,
            method: "GET",
        });
        return data.results;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function getAgents({ page, search }: { page: string, search: string }): Promise<apiRequest> {
//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/employers?page=${page}&search=${search}`, {
//             headers: {
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if (response.status === 200) {
//             const Data: EmployersResponse = response.data;
//             return {
//                 result: Data.results,
//                 totalAct: Data.count
//             }
//         } else {
//             throw new Error(`Unexpected response status: ${response.status}`);
//         }
//     } catch (error) {
//         console.error('Error fetching partners:', error);
//         throw error;
//     }
// }

export async function getAgents({ page, search }: { page: string, search: string }): Promise<apiRequest>{
    try {
        const data = await apiRequest({
            url: `/api/v1/chefbureux/employers`,
            method: "GET",
            params: { page, search }
        });
        return {
            result: data.results,
            totalAct: data.count
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function UpdateUser(Data: { [key: string]: any }) {

//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.put(`${process.env.SERVER_DOMAIN}/api/v1/update/user`, Data, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if (response) {
//             return true
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 406) {
//             throw new Error("Numéro Ou Email déja utilisé");
//         } else {
//             throw new Error("Network error");
//         }
//     }
// }

export async function UpdateUser(Data: { [key: string]: any }){

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/update/user`,
            data:  Data 
        });
        return true
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function UpdateDocument(Data: { [key: string]: any }) {
//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.put(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/completedossie`, Data, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })
//         if (response) {
//             return true
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || error.message);
//         } else {
//             throw new Error("Network error");
//         }
//     }
// }

export async function UpdateDocument(Data: { [key: string]: any }){

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/chefbureux/completedossie`,
            data:  Data 
        });
        return true
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}