import toast from "react-hot-toast";
import { apiRequest } from "./request";

type apiProducts = {
    result: Produit[];
    totalAct: number;
}

type apiCommand = {
    result: Order[];
    totalAct: number;
}

export default async function getMagasin(): Promise<Magasin | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/platfome/magasin/info",
        })

        if (response.code == 200) {
            return response.data
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getProducts(magasin_id: number, { page, catalogue, name }: { page: string, catalogue: string, name: string }): Promise<apiProducts | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/magasin/produis",
            data: { magasin_id },
            params: { page, catalogue, name }
        })

        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getCategories(): Promise<Catalogue[]> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/catalogues"
        })
        if (response.code == 200) {
            return response.data.data;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}

// export async function addProduct(Data: { magasin_id: number, [key: string]: unknown }) {
//     const loadingToastId = toast.loading('Creation produit...');
//     try {
//         const formData = new FormData();

//         // Append all key-value pairs from Data to formData
//         Object.entries(Data).forEach(([key, value]) => {
//             if (value instanceof File || value instanceof Blob) {
//                 // Handle file uploads properly
//                 formData.append(key, value);
//             } else {
//                 formData.append(key, String(value)); // Convert other values to string
//             }
//         });

//         const response = await apiRequest({
//             method: "POST",
//             url: "api/v1/magasin/create/produis",
//             data: Data,
//             headers: {
//                 "Content-Type": "multipart/form-data", // Ensure the correct content type
//             },
//         })

//         if (response.code == 201) {
//             toast.success('Produit creat Avec succès', { id: loadingToastId });
//             return true
//         } else {
//             toast.error(response.message, { id: loadingToastId });
//             return false
//         }
//     } catch {
//         toast.error("Problem connection", { id: loadingToastId });
//         return false
//     }
// }
export async function DeleteProduct(id: number) {
    const loadingToastId = toast.loading('suppression du produit...');
    try {
        const response = await apiRequest({
            method: "DELETE",
            url: "api/v1/produis/delete",
            data: { id }
        })
        if (response.code == 200) {
            toast.success('Produit Supprimer Avec succès', { id: loadingToastId });
            return true
        } else {
            toast.error('No autoriser', { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error('Problem connection', { id: loadingToastId });
        return false;
    }
}

export async function UpdateMagasin(Data: { magasin_id: number, [key: string]: unknown }) {
    try {
        const response = await apiRequest({
            method: "PUT",
            url: "api/v1/platfome/magasin/update",
            data: Data
        })
        if (response.code == 200) {
            return {
                code: response.code,
                data: response.data,
            }
        } else {
            return response.message;
        }
    } catch {
        return null;
    }
}

export async function getCommande(magasin_id: number, { page, etat }: { page: string, etat: string }): Promise<apiCommand | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/magasin/commandes",
            data: { magasin_id },
            params: { page, etat }
        })
        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}
