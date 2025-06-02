// "use server"

import { CommentaireData } from "./type_module/center_type"
import { apiRequest } from "./request";
import { toast } from "react-hot-toast"

type Comment = {
    id: number;
    comment: string;
}

type apiRequestType = {
    result: Users[];
    totalAct: number;
}

type apiParteneur = {
    result: Partenaire[];
    totalAct: number;
}

export async function getParteners({ page, search }: { page: string, search: string }): Promise<apiParteneur | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/centreappel/parteners",
            params: { page, search }
        });

        return {
            result: response.data.results,
            totalAct: response.data.count
        }
    } catch {
        return null
    }
}

export async function getBlockedParteners({ page }: { page: string }): Promise<apiParteneur | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/partener/bloquers",
            params: { page }
        });
        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            };
        } else {
            return null;
        }
    } catch {
        return null;
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
        return false
    }
}

export const getCommant = async (id: number): Promise<CommentaireData[] | null> => {
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/Comentaires/partener`,
            method: "GET",
            params: { id },
        });
        return data.data.data;
    } catch {
        return null
    }
};

export async function getChefCentre({ page, search }: { page: string, search: string }): Promise<apiParteneur | null> {
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
    } catch {
        return null
    }
}

export async function getAgents({ page, search }: { page: string, search: string }): Promise<apiRequestType | null> {
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
            toast.success('Mise à jour avec succès', { id: loadingToastId });
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
            toast.success('Mise à jour avec succès', { id: loadingToastId });
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

export async function UpdateGroup({ id, groupe, wilaya, code }: { id: number, groupe: string, wilaya: string, code: string }) {
    const loadingToastId = toast.loading('Submite Commande...');

    try {
        const data = await apiRequest({
            url: `/api/v1/user/add/groupe`,
            method: "PATCH",
            data: { id, groupe, wilaya, code }
        });
        if (data.code == 200) {
            toast.success('Commentaire ajouté Avec succès', { id: loadingToastId });
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

export async function getAllChef({ page, search, wilaya, groupe }: { page: string, search: string, wilaya: string, groupe: string }): Promise<apiRequestType | null> {
    try {
        const data = await apiRequest({
            url: `/api/v1/user/chefbureux`,
            method: "GET",
            params: { page, search, wilaya, groupe }
        });
        return {
            result: data.data.results,
            totalAct: data.data.count
        };
    } catch {
        return null
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
            toast.success('Utilisateur activé avec succès', { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }
    } catch {
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
            toast.success('Utilisateur désactivé avec succès', { id: loadingToastId });
            return true;
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.error("Problem connection", { id: loadingToastId });
        return false
    }
}