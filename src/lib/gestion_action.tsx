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

export async function getCourses(
    { page, search, valide }:
        { page: string, search: string, valide: string }
): Promise<apiAction> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/course",
            params: { page, search, valide }
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