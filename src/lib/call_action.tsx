"use server"

import { CommentaireData } from "./type_module/center_type"
import { Employer } from "./type_module/emploi_type"
import { apiRequest } from "./request";

type Comment = {
    id: number;
    comment: string;
}

type apiRequest = {
    result: Employer[];
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
            result: response.results,
            totalAct: response.count
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function AddComment({ id, comment }: Comment) {
    try {
        const data = await apiRequest({
            url: `/api/v1/centre_appel/comentaire/add`,
            method: "post",
            data: { "partener_id": id, "commentaire": comment }
        });
        if (data) {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

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

export async function getChefCentre({ page, search }: { page: string, search: string }): Promise<apiParteneur> {
    try {
        const data = await apiRequest({
            url: `/api/v1/centreappelgroupe/pertener`,
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

export async function getAgents({ page, search }: { page: string, search: string }): Promise<apiRequest> {
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
// Define a more specific type for UpdateUser and UpdateDocument
type UpdateData = {
    id: string;
    [key: string]: unknown; // Allows additional dynamic properties
}

export async function UpdateUser(Data: UpdateData) {

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/update/user`,
            data: Data
        });
        if (data) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function UpdateDocument(Data: UpdateData) {

    try {
        const data = await apiRequest({
            method: "PUT",
            url: `/api/v1/chefbureux/completedossie`,
            data: Data
        });
        if (data) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function UpdateGroup({ id, groupe }: { id: number, groupe: string }) {
    try {
        const data = await apiRequest({
            url: `api/v1/user/add/groupe`,
            method: "PATCH",
            data: { id, groupe }
        });
        if (data) {
            return true;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function getAllChef(): Promise<Users[]> {
    try {
        const data = await apiRequest({
            url: `/api/v1/user/chefbureux`,
            method: "GET",
        });
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function ActiveUser({ user_id }: { user_id: number }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/user/activate",
            data: { user_id }
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function DisableUser({ id }: { id: number }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/user/desactiver",
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