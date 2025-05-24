"use server"

import { CookiesRemover } from "./cookies";
import { cookies } from 'next/headers';
import { apiRequest } from "./request";
import { Role } from "./tools/roles/user_role";


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

            if (Role(data.data.role)) {

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
                return "Wrong information"
            }
        } else {
            return data.message
        }
    } catch {
        return null
    }
}

export async function Register(data: DataType) {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: '/api/v1/user/starshop/registre/',
            data: data,
        })
        if (response.code == 201) {
            return {
                code: response.code,
                data: response.data,
            }
        } else {
            return {
                code: response.code,
                data: response.message
            }
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

export async function BlockUser2({ id, bloque }: { id: number, bloque: boolean }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/centreappel/bloque/partener",
            data: { id, bloque }
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

type UpdateData = {
    id: string;
    image_url: File | null; // Allows additional dynamic properties
}


export async function UpdatePic(Data: UpdateData): Promise<{ success: boolean; message: string }> {
    const accessToken = (await cookies()).get("access_token")?.value;
    try {
        // Create a FormData object
        const formData = new FormData();

        // Append the file to the FormData object
        if (Data.image_url) {
            formData.append("image_url", Data.image_url); // "file" is the key expected by the server
        }

        // Append other fields if needed
        if (Data.id) {
            formData.append("id", Data.id);
        }

        const response = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/uploaduser`, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.status == 200) {
            return { success: true, message: "Mise à jour réussie !" }; // Return success message
        } else {
            const errorData = await response.json(); // Assuming the server returns error details in JSON
            return { success: false, message: errorData.message || "La mise à jour a échoué. Veuillez réessayer." };
        }
    } catch {
        return { success: false, message: "Probleme connection" };
    }
}

export async function addProduct(Data: { magasin_id: number, [key: string]: unknown }) {
    const accessToken = (await cookies()).get("access_token")?.value;
    try {
        const formData = new FormData();

        // Append all key-value pairs from Data to formData
        Object.entries(Data).forEach(([key, value]) => {
            if (value instanceof File || value instanceof Blob) {
                // Handle file uploads properly
                formData.append(key, value);
            } else {
                formData.append(key, String(value)); // Convert other values to string
            }
        });
        const response = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/magasin/create/produis`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if (response.status == 201) {
            return { success: true, message: "Produit create Avec succès" }; // Return success message
        } else {
            const errorData = await response.json(); // Assuming the server returns error details in JSON
            return { success: false, message: errorData.message || "La mise à jour a échoué. Veuillez réessayer." };
        }
    } catch {
        return { success: false, message: "Probleme connection" };
    }
}

export async function ModifieProduct(Data: { id: number, [key: string]: unknown }) {
    const accessToken = (await cookies()).get("access_token")?.value;
    try {
        const formData = new FormData();

        // Append all key-value pairs from Data to formData
        Object.entries(Data).forEach(([key, value]) => {
            if (value instanceof File || value instanceof Blob) {
                // Handle file uploads properly
                formData.append(key, value);
            } else {
                formData.append(key, String(value)); // Convert other values to string
            }
        });
        const response = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/produis/update`, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if (response.status == 200) {
            return { success: true, message: "Mise à jour réussie !" }; // Return success message
        } else {
            const errorData = await response.json(); // Assuming the server returns error details in JSON
            return { success: false, message: errorData.message || "La mise à jour a échoué. Veuillez réessayer." };
        }
    } catch {
        return { success: false, message: "Probleme connection" };
    }
}

export async function UpdateMagPic(Data: { magasin_id: string; image_background?: File | null; image?: File | null },
    type: string): Promise<{ success: boolean; message: string }> {

    const accessToken = (await cookies()).get("access_token")?.value;
    try {
        // Create a FormData object
        const formData = new FormData();
        formData.append("magasin_id", Data.magasin_id);

        // Append the correct image based on type
        if (type === "background" && Data.image_background) {
            formData.append("image_backgroud", Data.image_background);
        } else if (type !== "background" && Data.image) {
            formData.append("image", Data.image);
        }

        // console.log(formData);

        const response = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/platfome/magasin/uploadimages`, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.status == 200) {
            return { success: true, message: "Mise à jour réussie !" }; // Return success message
        } else {
            const errorData = await response.json(); // Assuming the server returns error details in JSON
            return { success: false, message: errorData.message || "La mise à jour a échoué. Veuillez réessayer." };
        }
    } catch {
        return { success: false, message: "Probleme connection" };
    }
}