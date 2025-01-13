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

export async function getAction({ page, search }: { page: string, search: string }): Promise<apiAction> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/actions",
            params: { page, search }
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

type DataType = {
    [key: string | number]: unknown
}

export async function AddTypeMagasin(Data: DataType) {
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/commerciale/typecompte/add",
            data: Data
        })
        if (response) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function getMagasin(): Promise<MagasinType[]> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/commerciale/typecomptes"
        })
        return response
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
        if (response) {
            return true
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}