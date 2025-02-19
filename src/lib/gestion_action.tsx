import toast from "react-hot-toast";
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

export async function getTypeMagasin(): Promise<MagasinType[] | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/commerciale/typecomptes"
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

export async function AddTypeMagasin(Data: DataType) {
    const loadingToastId = toast.loading('Submite update...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/commerciale/typecompte/add",
            data: Data
        })
        if (response.code == 201) {
            toast.success('Mise à jour avec Succesfully', { id: loadingToastId });
            return true
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false
        }
    } catch {
        toast.error("Problem connection", { id: loadingToastId });
        return false
    }
}

export async function modifyMagasin(Data: DataType) {
    const loadingToastId = toast.loading('Submite update...');
    try {
        const response = await apiRequest({
            method: "PUT",
            url: "/api/v1/commerciale/typepertenneur/update",
            data: Data
        })

        if (response.code == 200) {
            toast.success('Mise à jour avec Succesfully', { id: loadingToastId });
            return true
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false
        }
    } catch {
        toast.error("problem connection", { id: loadingToastId });
        return false
    }
}

export async function getCourses(
    { page, search, valide }:
        { page: string, search: string, valide: string }
): Promise<apiAction | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/vtc/courses",
            params: { page, search, valide }
        })
        if (response.code == 200) {
            return {
                result: response.data.data,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getGroup({ wilaya }: { wilaya: string }) {
    try {
        const data = await apiRequest({
            method: "GET",
            url: "api/v1/commercialer/groups",
            data: { wilaya }
        })
        return data.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "An error occurred");
        }
        throw new Error("Unexpected error");
    }
}

export async function ValideCourses({ courseIds }: { courseIds: number[] }) {
    const loadingToastId = toast.loading('Submite Commande...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/vtc/course/valide",
            data: { courseIds }
        })
        if (response.code == 200) {
            toast.success('Valider Avec succès', { id: loadingToastId });
            return true
        } else {
            toast.error(response.message, { id: loadingToastId });
            return false
        }

    } catch {
        toast.error("Problem connection", { id: loadingToastId });
        return false
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


        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            };
        } else {
            return null
        }

    } catch {
        return null
    }
}