import { apiRequest } from "./request";

type apiAction = {
    result: Courses[];
    totalAct: number;
}


//type agent result
type apiAgents = {
    result: Users[];
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
            url: "/api/v1/vtc/courses",
            params: { page, search, valide }
        })

        return {
            result: response.data,
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

export async function ValideCourses({ courseIds }: { courseIds: number[] }) {
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/vtc/course/valide",
            data: { courseIds }
        })
        return response;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

// GET ALL users role agent 
export async function getAllAgent({ role, page, search, wilaya, groupe }:
    { role: string, page: string, search: string, wilaya: string, groupe: string }): Promise<apiAgents | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/users",
            params: { role, page, search, wilaya, groupe }
        })

        return {
            result: response.results,
            totalAct: response.count
        };
    } catch (error) {
        if (error instanceof Error) {
            // Handle 404 errors explicitly
            if (error.message.includes("404")) {
                return null
            }

            // For other errors, rethrow them
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}