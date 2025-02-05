import { apiRequest } from "./request";
import { toast } from "react-hot-toast";

type apiRequest = {
    result: Result[];
    totalAct: number;
}

type apiAction = {
    result: actionData;
    totalAct: number;
    prixTotal: number;
}


export async function getCommand({ page, livreur, valide }: { page: string, livreur: string, valide: string }): Promise<apiRequest | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/chefbureux/commandes",
            params: { page, livreur, valide }
        });
        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function getAction({ page, search, agent, date }: { page: string, search: string, agent: string, date: string }): Promise<apiAction | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/actions",
            params: { page, search, agent, date }
        });
        if (response.code == 200) {
            return {
                result: response.data.results,
                totalAct: response.data.count,
                prixTotal: response.data.prix_count
            }
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function sendEmail(Data: DataType) {
    const loadingToastId = toast.loading('Submite message...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/send/email/support/dev",
            data: Data
        })
        if (response.code == 200) {
            toast.success('le message est envoyé', { id: loadingToastId });
            return true
        } else if (response.code == 429) {
            toast.error("Vous avez depasé la limite", { id: loadingToastId })
            return false
        } else {
            toast.error(response.message, { id: loadingToastId })
            return false
        }
    } catch {
        toast.error("Problem connection", { id: loadingToastId })
        return false
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
        } else {
            return false
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

export async function demandeAction({ flixy_id, etat, some_a_envoye }: { flixy_id: number, etat: "accepte" | "refuse" | "annuler", some_a_envoye: number }) {
    const loadingToastId = toast.loading('Submite Demande...');
    try {
        const response = await apiRequest({
            method: "PATCH",
            url: "api/v1/centre_appel/etat/demmande",
            data: { flixy_id, etat, some_a_envoye }
        })
        if (response.code == 200) {
            toast.success('se compte a eté reharger avec succès', { id: loadingToastId });
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