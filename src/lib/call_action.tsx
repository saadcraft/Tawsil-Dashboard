// "use server"

import { CommentaireData } from "./type_module/center_type"
import { apiRequest } from "./request";
import { toast } from "react-hot-toast"

type Comment = {
    id: number;
    comment: string;
}

type apiRequest = {
    result: Users[];
    totalAct: number;
}

type apiParteneur = {
    result: Partenaire[];
    totalAct: number;
}

export async function getParteners({ page, search }: { page: string, search: string }): Promise<apiParteneur> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/centreappel/parteners",
            params: { page, search }
        });
        return {
            result: response.data.results,
            totalAct: response.data.count
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function AddComment({ id, comment }: Comment) {
    const loadingToastId = toast.loading('Submite Commande...');
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/comentaire/add`,
            method: "post",
            data: { "partener_id": id, "commentaire": comment }
        });
        if (data.code == 201) {
            toast.success('Comment added Succesfully', { id: loadingToastId });
            return true;
        } else {
            toast.error(data.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error("Problem de connection", { id: loadingToastId });
        return false;
    }
}

export const getCommant = async (id: number): Promise<CommentaireData[]> => {
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/Comentaires/partener`,
            method: "GET",
            params: { id },
        });
        return data.data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
};

export async function getChefCentre({ page, search }: { page: string, search: string }): Promise<apiParteneur> {
    try {
        const data = await apiRequest({
            url: `/api/v1/centreappelgroupe/pertener`,
            method: "GET",
            params: { page, search }
        });
        return {
            result: data.data.results,
            totalAct: data.data.count
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function getAgents({ page, search }: { page: string, search: string }): Promise<apiRequest | null> {
    try {
        const data = await apiRequest({
            url: `/api/v1/chefbureux/employers`,
            method: "GET",
            params: { page, search }
        });
        if (data.code == 200) {
            return {
                result: data.data.results,
                totalAct: data.data.count
            };
        } else {
            return null
        }
    } catch {
        return null
    }
}
// Define a more specific type for UpdateUser and UpdateDocument
type UpdateData = {
    id: string;
    [key: string]: unknown; // Allows additional dynamic properties
}

export async function UpdateUser(Data: UpdateData) {

    const loadingToastId = toast.loading('Submite Updating...');

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/update/user`,
            data: Data
        });
        if (data.code == 200) {
            toast.success('Updated with Succesfully', { id: loadingToastId });
            return true;
        } else {
            toast.error(data.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error("problem connection", { id: loadingToastId });
        return false;
    }
}

export async function UpdateDocument(Data: UpdateData) {

    const loadingToastId = toast.loading('Submite Documment...');

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/chefbureux/completedossie`,
            data: Data
        });
        if (data.code == 200) {
            toast.success('Updated with Succesfully', { id: loadingToastId });
            return true;
        } else {
            toast.error(data.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error("problem connection", { id: loadingToastId });
        return false;
    }
}

export async function UpdateGroup({ id, groupe }: { id: number, groupe: string }) {
    const loadingToastId = toast.loading('Submite Commande...');
    try {
        const data = await apiRequest({
            url: `/api/v1/user/add/groupe`,
            method: "PATCH",
            data: { id, groupe }
        });
        if (data.code == 200) {
            toast.success('Comment added Succesfully', { id: loadingToastId });
            return true;
        } else {
            toast.success(data.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.success("problem connection", { id: loadingToastId });
        return false;
    }
}

export async function getAllChef(): Promise<Users[]> {
    try {
        const data = await apiRequest({
            url: `/api/v1/user/chefbureux`,
            method: "GET",
        });
        return data.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function ActiveUser({ user_id }: { user_id: number }) {

    const loadingToastId = toast.loading('Submite Activé...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/user/activate",
            data: { user_id }
        });

        if (response.code == 200) {
            toast.success('User activated with successfuly', { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }
    } catch (error) {
        toast.error("Problem connection", { id: loadingToastId });
        return false
    }
}

export async function DisableUser({ id }: { id: number }) {
    const loadingToastId = toast.loading('Submite Désactive...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/user/desactiver",
            data: { id }
        });

        if (response.code == 200) {
            toast.success('User Désactivé with successfuly', { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }
    } catch (error) {
        toast.error("Problem connection", { id: loadingToastId });
        return false
    }
}