import { apiRequest } from "./request"
import toast from 'react-hot-toast';


type apiCasses = {
    result: Caisses[],
    totalAct: number
}

type apiAction = {
    result: actionData;
    totalAct: number;
    prixTotal: number;
}

export async function GetAllCasses(
    { page, search, date, chef, approvie, wilaya }: { page: string, search: string, date: string, chef: string, approvie: string, wilaya: string }
): Promise<apiCasses | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "api/v1/comtable/cassies",
            params: { page, search, date, chef, approvie, wilaya }
        })
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

export async function AproveCass({ cassie_id }: { cassie_id: number }) {

    const loadingToastId = toast.loading('Submite Aprovment...');
    try {

        const response = await apiRequest({
            method: "PATCH",
            url: "/api/v1/comtable/cassie/approvie",
            data: { cassie_id }
        })

        if (response.code == 200) {
            toast.success('Caisse approuvée avec succès', { id: loadingToastId });
            return true;
        } else {
            toast.success(response.message, { id: loadingToastId });
            return false;
        }
    } catch {
        toast.success("Problem connection", { id: loadingToastId });
        return false;
    }
}


export async function getComptAction({ page, search, groupe, date }: { page: string, search: string, groupe: string, date: string }): Promise<apiAction | null> {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/comtable/actions",
            params: { page, search, groupe, date }
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

export async function SubmitGroupeVTC({ id }: { id: number }) {
    const loadingToastId = toast.loading('Submite Commande...');
    try {
        const response = await apiRequest({
            method: "POST",
            url: "/api/v1/courses/validation",
            data: { id }
        });
        if (response.code == 200) {
            toast.success('valider Succesfully', { id: loadingToastId });
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


export async function staticVTC({ mounth, anne, paye }: { mounth: string, anne: string, paye: string }) {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/admin/coursa/month",
            params: { mounth, anne, paye }
        })

        if (response.code == 200) {
            return response.data.data
        } else {
            return null
        }
    } catch {
        return null
    }
}

export async function staticCommande({ mounth, anne, paye }: { mounth: string, anne: string, paye: string }) {
    try {
        const response = await apiRequest({
            method: "GET",
            url: "/api/v1/admin/commande/month",
            params: { mounth, anne, paye }
        })

        if (response.code == 200) {
            return response.data.data
        } else {
            return null
        }
    } catch {
        return null
    }
}