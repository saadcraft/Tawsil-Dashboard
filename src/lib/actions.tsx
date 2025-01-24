"use server"

import { apiRequest } from "./request";

type apiRequest = {
    result: Result[];
    totalAct: number;
}

type apiAction = {
    result: actionData;
    totalAct: number;
}


export async function getCommand({ page, livreur, valide }: { page: string, livreur: string, valide: string }): Promise<apiRequest> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chefbureux/commandes",
            params: { page, livreur, valide }
        });
        return {
            result: response.data.results,
            totalAct: response.data.count
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function getAction({ page, search }: { page: string, search: string }): Promise<apiAction> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/actions",
            params: { page, search }
        });
        return {
            result: response.data.results,
            totalAct: response.data.count
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function sendEmail(Data: DataType) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/send/email/support/dev",
            data: Data
        })
        if (response.code == 200) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function verifyChangeToken({ token, uid }: { token: string, uid: string }) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/verifie/token",
            data: { token, uid }
        })
        if (response.code == 200) {
            return true
        }
    } catch {
        return false
    }
}

// Get statistic of users

export async function GetStatic(): Promise<Context> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/commercial/static",
        })
        return response.data.context
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}