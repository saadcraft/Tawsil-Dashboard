"use server"

import axios from "axios";
import { DateTime } from 'next-auth/providers/kakao';
import { cookies } from 'next/headers';
import { Result } from "./type_module/casses_type"
import { apiRequest } from "./request";

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

// export async function AddAgent(access: string, Data: Data) {
//     const { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, pass, password } = Data

//     if (pass != password) {
//         throw new Error("Password and confirm password are not the same");
//     }

//     try {
//         const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/users/chef_bureux/agent/create`, { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, password }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`,
//             }
//         });
//         if (res.status === 201) {
//             return 'Agent added successfully';
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || error.message);
//         } else {
//             throw new Error('Unexpected response from the server');
//         }
//     }
// }

export async function AddAgent(token: string, Data: Data) {

    const { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, pass, password } = Data
    
    if (pass !== password) {
        throw new Error("Password and confirm password are not the same");
    }

    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/users/chef_bureux/agent/create",
            data: { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, password }
        });
        if (response.status === 201) {
            return 'Agent added successfully';
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function SubmitCommande({ access, id }: { access: string, id: number[] }) {

//     try {

//         const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/user/commandes/valider`, { id }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if (response) {
//             return response.data;
//         }

//     } catch (error) {
//         throw error
//     }

// }

export async function SubmitCommande({ access, id }: { access: string, id: number[] }) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/user/commandes/valider",
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


// export async function CloseCasses({ access, prix }: { access: string, prix: string }) {

//     try {
//         const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/arretcasse`, { prix }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })
//         if (response.status === 200) {
//             return true; // Success
//         } else {
//             return false; // Handle specific cases if needed
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || error.message);
//         } else {
//             throw new Error("Network error");
//         }
//     }
// }

export async function CloseCasses({ access, prix }: { access: string, prix: string }) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/chefbureux/arretcasse",
            data: { prix }
        });

        return true;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}


// export async function OpenCasses({ access }: { access: string }) {

//     try {
//         const response = await axios.patch(`${process.env.SERVER_DOMAIN}/api/v1/cassie/chef/ouvrir`, {}, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${access}`
//             }
//         })
//         if (response) {
//             return true; // Indicate success
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 400) {
//             return false; // Specific error (e.g., already opened)
//         } else {
//             throw new Error("Network error"); // Unexpected error
//         }
//     }
// }

export async function OpenCasses({ access }: { access: string }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/cassie/chef/ouvrir",
        });

        return true;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// export async function getCasses(): Promise<Result[]> {

//     const access = (await cookies()).get("access_token")?.value

//     try {
//         const response = await axios.get(`${process.env.SERVER_DOMAIN}/api/v1/chef/cassies`, {
//             headers: {
//                 Authorization: `Bearer ${access}`
//             }
//         })

//         if (response.status === 200) {
//             return response.data.results
//         } else {
//             throw new Error(`Unexpected response status: ${response.status}`);
//         }

//     } catch (error) {
//         throw new Error(`Error Network`);
//     }
// }

export async function getCasses(): Promise<Result[]> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chef/cassies",
        });

        return response.results;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}