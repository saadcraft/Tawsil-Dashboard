import { apiRequest } from "./request";

type apiAction = {
    result: Result[];
    totalAct: number;
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

export async function modifyMagasin(Data: DataType) {
    try {
        const response = await apiRequest({
            method: "PUT",
            url: "/api/v1/commerciale/typepertenneur/update",
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

export async function getPartenaire(
    { page, search, valide, type_partener }:
        { page: string, search: string, valide: string, type_partener: string }
): Promise<apiAction> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/commercial/perteners",
            params: { page, search, valide, type_partener }
        })

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

export async function getGroup({ wilaya }: { wilaya: string }) {
    try {
        const data = apiRequest({
            method: "GET",
            url: "api/v1/commercialer/groups",
            data: { wilaya }
        })
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}